import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { ReactionsService } from '@src/modules/reactions/reactions.service';
import { Message } from 'discord.js';

@Command({
  path: 'delete-task',
  description: 'Удалить задание',
  arguments: [
    {
      name: 'id',
      type: ArgumentsEnum.INT,
    },
  ],
})
export class DeleteTaskCommand implements ICommand {
  constructor(private client: KnexClient, private reactionsService: ReactionsService) {}

  async exec(message: Message, [id]: [number]): Promise<void> {
    await this.client.knex.delete().where('id', id);
    this.reactionsService.ok(message);
  }
}
