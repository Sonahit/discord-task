import { Module } from '@src/core/decorators/module.decorator';
import { AddQuestionCommand } from './commands/add-question.command';
import { DeleteQuestionCommand } from './commands/delete-question.command';
import { GetQuestionCommand } from './commands/get-questions.command';
import { QuestionsRepository } from './questions.repository';

@Module({
  commands: [AddQuestionCommand, DeleteQuestionCommand, GetQuestionCommand],
  providers: [QuestionsRepository],
})
export class QuestionsModule {}
