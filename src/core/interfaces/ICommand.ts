import { Message } from 'discord.js';

export interface ICommand<Args extends any[] = any[]> {
  exec(message: Message, args: [...Args]): PromiseLike<void> | void;
}
