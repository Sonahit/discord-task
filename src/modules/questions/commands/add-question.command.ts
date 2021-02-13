import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { ReactionsService } from '@src/modules/reactions/reactions.service';
import { Message } from 'discord.js';
import { QuestionsEntity } from '../questions.entity';

@Command({
  path: 'add-question',
  description: 'Добавить вопрос',
  arguments: [
    {
      name: 'question',
      type: ArgumentsEnum.STRING,
    },
  ],
})
export class AddQuestionCommand implements ICommand {
  constructor(private client: KnexClient, private reactionsService: ReactionsService) {}

  async exec(message: Message, [question]: [string]): Promise<void> {
    const entity = new QuestionsEntity();
    entity.text = question;
    await this.client.knex.insert(entity).into(QuestionsEntity.tableName);
    this.reactionsService.ok(message);
  }
}
