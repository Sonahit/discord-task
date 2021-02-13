import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { EmbedService } from '@src/modules/embed/embed.service';
import { Message } from 'discord.js';

@Command({
  path: 'add-question',
  arguments: [
    {
      name: 'question',
      type: ArgumentsEnum.STRING,
    },
  ],
})
export class AddQuestionCommand implements ICommand {
  constructor(private client: KnexClient, private embedService: EmbedService) {}

  exec(message: Message, [question]: [string]): void {
    throw new Error('Method not implemented.');
  }
}
