import { Module } from './core/decorators/module.decorator';
import { DatabaseModule } from './database/database.module';
import { EmbedModule } from './modules/embed/embed.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ReactionsModule } from './modules/reactions/reactions.module';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  modules: [QuestionsModule, EmbedModule, DatabaseModule, ReactionsModule, TaskModule],
})
export class AppModule {}
