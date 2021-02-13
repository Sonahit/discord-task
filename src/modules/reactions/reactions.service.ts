import { DISCORD_TOKEN } from '@src/core/constants/app.constants';
import { Inject } from '@src/core/injector/inject.decorator';
import { Client, Message } from 'discord.js';
import { ReactionsEnum } from './reactions.enum';

export class ReactionsService {
  constructor(@Inject(DISCORD_TOKEN) private client: Client) {}

  async addReaction(message: Message, reaction: ReactionsEnum): Promise<boolean> {
    try {
      await message.react(reaction);
      return true;
    } catch (e) {
      return false;
    }
  }

  error(message: Message): Promise<boolean> {
    return this.addReaction(message, ReactionsEnum.ERROR_REACTION);
  }

  ok(message: Message): Promise<boolean> {
    return this.addReaction(message, ReactionsEnum.OK_REACTION);
  }
}
