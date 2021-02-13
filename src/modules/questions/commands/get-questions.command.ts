import { Command } from '@src/core/decorators/command.decorator';
import { ArgumentsEnum } from '@src/core/enums/arguments.enum';
import { ICommand } from '@src/core/interfaces/ICommand';
import { KnexClient } from '@src/database/client';
import { ReactionsService } from '@src/modules/reactions/reactions.service';
import { Message } from 'discord.js';
import { QuestionsEntity } from '../questions.entity';
import { plainToClass } from 'class-transformer';
import { EmbedService } from '@src/modules/embed/embed.service';

@Command({
  path: 'get-questions',
  description: 'Получить конечный список вопросов',
  arguments: [
    {
      name: 'count',
      type: ArgumentsEnum.INT,
      required: false,
    },
  ],
})
export class GetQuestionCommand implements ICommand {
  constructor(
    private client: KnexClient,
    private reactionsService: ReactionsService,
    private embedService: EmbedService,
  ) {}

  async exec(message: Message, [count = 3]: [number]): Promise<void> {
    const questions = (await this.client.knex.select<QuestionsEntity[]>().from(QuestionsEntity.tableName)).map((v) =>
      plainToClass(QuestionsEntity, v),
    );
    const questionsCount = count > questions.length ? questions.length : count;
    const selectedQuestions = Array.from(
      { length: questionsCount },
      () => questions[Math.floor(Math.random() * questions.length)],
    );
    const embed = await this.embedService.createEmbed();

    embed.setTitle('Выбранные вопросы');
    selectedQuestions.forEach((q, i) => {
      embed.addField(`Вопрос #${i + 1}`, q.text);
      embed.addField('', q.id, true);
    });
    await this.reactionsService.ok(message);
    await message.channel.send(embed);
  }
}
