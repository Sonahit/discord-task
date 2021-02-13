import { Module } from '@src/core/decorators/module.decorator';
import { AddQuestionCommand } from './commands/add-question.command';
import { DeleteQuestionCommand } from './commands/delete-question.command';
import { GetQuestionCommand } from './commands/get-questions.command';

@Module({
  commands: [AddQuestionCommand, DeleteQuestionCommand, GetQuestionCommand],
})
export class QuestionsModule {}
