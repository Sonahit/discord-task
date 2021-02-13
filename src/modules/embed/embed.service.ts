import { Message, MessageEmbed } from 'discord.js';
import { Embed } from './embed.interface';

export class EmbedService {
  async createEmbed(embedStruct?: Embed): Promise<MessageEmbed> {
    const embed = new MessageEmbed(embedStruct);
    return embed;
  }

  async sendEmbed(message: Message, embedStruct: Embed): Promise<void> {
    const embed = new MessageEmbed(embedStruct);
    await message.author.send(embed);
  }
}
