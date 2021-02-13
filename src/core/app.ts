import { Client, Message, MessageEmbed } from 'discord.js';
import { ICommand } from './interfaces/ICommand';
import { ILogger } from './interfaces/ILogger';
import * as pathtoregexp from 'path-to-regexp';
import { Logger } from './logger';
import { AppConfig } from './types';
import { CommandOptions } from './types/Command';
import { BotError } from './errors/bot.error';
import { ArgumentsEnum } from './enums/arguments.enum';
import { Argument } from './types/Argument';
import { DELIMITER } from './constants/app.constants';
import { ReactionsEnum } from '@src/modules/reactions/reactions.enum';

export class App {
  public logger: ILogger = new Logger();
  private commands: { instance: ICommand; options: CommandOptions }[] = [];

  constructor(public client: Client, private config: AppConfig) {}

  useLogger(logger: ILogger): void {
    this.logger = logger;
  }

  getConfig(): AppConfig {
    return this.config;
  }

  async login(token?: string): Promise<void> {
    await this.client.login(token || this.config.TOKEN);
    this.logger.log(`Client signed in as <@${this.client.user?.id}> ${this.client.user?.username}`);
  }

  registerCommands(commands: { instance: ICommand; options: CommandOptions }[]): void {
    this.commands = commands;
  }

  shouldHandle(message: Message): boolean {
    return message.content.startsWith(this.config.PREFIX);
  }

  match(path: string, commandName: string): boolean {
    const cmd = pathtoregexp.pathToRegexp(commandName);
    return cmd.test(path);
  }

  parseMessage(message: Message): [string, string] {
    const [cmd] = message.content.match(new RegExp(`${this.config.PREFIX}((\\w|-)+)`, 'g')) || [''];
    const args = message.content.split(cmd).filter(Boolean)[0];
    return [cmd.trim().substring(1), args?.trim()];
  }

  parseArgs(args: string, count: number): (string | number)[] {
    const splittedArgs = count > 1 ? args.split(DELIMITER) : [args];
    return splittedArgs.map((v) => {
      const value = Number(v);
      return value ? value : v;
    });
  }

  usage(message: Message): void {
    const descriptions = this.commands.map((v) => ({ name: v.options.path, description: v.options.description }));
    const embed = new MessageEmbed();
    descriptions.forEach(({ name, description }, i) => {
      embed.addField(`Команда #${i}`, `${name} ${description}`);
    });
    message.channel.send(embed);
  }

  private argumentTypeToString(type: ArgumentsEnum) {
    return {
      [ArgumentsEnum.INT]: 'INT',
      [ArgumentsEnum.STRING]: 'STRING',
    }[type];
  }

  private validateArguments(required: Argument[], provided: (string | number)[]): void {
    if (required.length !== provided.length) {
      const embed = new MessageEmbed();
      embed.setTitle('Аргументы');
      required.forEach((a) => {
        embed.addField(
          a.name,
          `type: ${this.argumentTypeToString(a.type)} required: ${a.required ? 'true' : 'false'}`,
          true,
        );
      });
      throw new BotError(`Неверное количество аргументов! Требуется ${required.length} аргументов!`, embed);
    }

    for (let i = 0; i < provided.length; i++) {
      const arg = provided[i];
      const reqArg = required[i];
      if (typeof arg === 'undefined' && !reqArg.required) continue;
      switch (reqArg.type) {
        case ArgumentsEnum.INT:
          {
            if (!Number.isFinite(arg)) {
              throw new BotError(
                `Неправильный тип аргумента номер ${i + 1}. Требуется ${this.argumentTypeToString(reqArg.type)}`,
              );
            }
          }
          break;
      }
    }
  }

  async handleMessages(message: Message): Promise<void> {
    if (!this.shouldHandle(message)) return;

    this.logger.log('Handling message...');

    const [path, args] = this.parseMessage(message);

    if (this.match(path, 'help')) {
      return this.usage(message);
    }

    const command = this.commands.find((v) => this.match(path, v.options.path));

    if (!command) return;

    const { instance, options } = command;
    const { arguments: cargs = [] } = options;

    try {
      const newArgs = this.parseArgs(args, cargs.length);
      this.validateArguments(cargs, newArgs);
      await instance.exec(message, newArgs);
    } catch (e) {
      if (e instanceof BotError) {
        if (e.embed) {
          e.embed.setDescription(e.message);
        }
        await message.channel.send(e.embed || e.message);
      } else {
        await message.channel.send(e.message);
      }
      message.react(ReactionsEnum.ERROR_REACTION);
    }
  }
}
