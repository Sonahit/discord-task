import { MessageEmbed } from 'discord.js';

export class BotError extends Error {
  constructor(message: string, public embed?: MessageEmbed) {
    super(message);
  }
}
