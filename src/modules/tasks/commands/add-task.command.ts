import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { BotError } from '@src/core/errors/bot.error';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { ReactionsService } from '@src/modules/reactions/reactions.service';
import { Message } from 'discord.js';
import { TaskEntity } from '../task.entity';

@Command({
  path: 'add-task',
  description: 'Добавить задание',
  arguments: [
    {
      name: 'task',
      type: ArgumentsEnum.STRING,
    },
  ],
})
export class AddTaskCommand implements ICommand {
  constructor(private client: KnexClient, private reactionsService: ReactionsService) {}

  async exec(message: Message, [task]: [string]): Promise<void> {
    const entity = new TaskEntity();
    if (!task) {
      throw new BotError('Требуется текст задания');
    }
    entity.text = task;
    await this.client.knex.insert(entity).into(TaskEntity.tableName);
    this.reactionsService.ok(message);
  }
}
