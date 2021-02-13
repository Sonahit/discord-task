import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { EmbedService } from '@src/modules/embed/embed.service';
import { Message } from 'discord.js';

@Command({
  path: 'delete-question',
  arguments: [
    {
      name: 'id',
      type: ArgumentsEnum.INT,
    },
  ],
})
export class DeleteQuestionCommand implements ICommand {
  constructor(private client: KnexClient, private embedService: EmbedService) {}

  exec(message: Message, args: [number]): void {
    throw new Error('Method not implemented.');
  }
}
