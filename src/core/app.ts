import { Client, Message } from 'discord.js';
import { ICommand } from './interfaces/ICommand';
import { ILogger } from './interfaces/ILogger';
import * as pathtoregexp from 'path-to-regexp';
import { Logger } from './logger';
import { AppConfig } from './types';
import { CommandOptions } from './types/Command';

export class App {
  private logger: ILogger = new Logger();
  private commands: { instance: ICommand; options: CommandOptions }[] = [];

  constructor(private client: Client, private config: AppConfig) {}

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
    return pathtoregexp.pathToRegexp(commandName).test(path);
  }

  parseMessage(message: Message): [string, (string | number)[]] {
    const [, path = '', ...args] = message.content.match(/\!(\w+)(.*)/) || [];
    return [path.trim(), args.map((v) => v.trim()).map((v) => (Number(v) ? Number(v) : v))];
  }

  usage(message: Message): void {
    //
  }

  async handleMessages(message: Message): Promise<void> {
    if (!this.shouldHandle(message)) return;

    const [path, args] = this.parseMessage(message);

    if (this.match(path, 'help')) {
      return this.usage(message);
    }

    const command = this.commands.find((v) => this.match(path, v.options.path));

    if (!command) return;
    const { instance } = command;
    try {
      await instance.exec(message, args);
    } catch (e) {}
  }
}
