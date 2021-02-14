import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { ReactionsService } from '@src/modules/reactions/reactions.service';
import { Message } from 'discord.js';
import { TaskEntity } from '../task.entity';
import { plainToClass } from 'class-transformer';
import { EmbedService } from '@src/modules/embed/embed.service';

@Command({
  path: 'get-task',
  description: 'Получить конечный список заданий',
  arguments: [
    {
      name: 'count',
      type: ArgumentsEnum.INT,
      required: false,
    },
  ],
})
export class GetTaskCommand implements ICommand {
  constructor(
    private client: KnexClient,
    private reactionsService: ReactionsService,
    private embedService: EmbedService,
  ) {}

  async exec(message: Message, [count = 3]: [number]): Promise<void> {
    const tasks = (await this.client.knex.select<TaskEntity[]>().from(TaskEntity.tableName)).map((v) =>
      plainToClass(TaskEntity, v),
    );
    const TaskCount = count > tasks.length ? tasks.length : count;
    const selectedTask = Array.from({ length: TaskCount }, () => tasks[Math.floor(Math.random() * tasks.length)]);
    const embed = await this.embedService.createEmbed();

    embed.setTitle('Выбранные задания');
    selectedTask.forEach((q, i) => {
      embed.addField(`Задание #${i + 1}-${q.id}`, q.text);
    });
    await this.reactionsService.ok(message);
    await message.channel.send(embed);
  }
}
