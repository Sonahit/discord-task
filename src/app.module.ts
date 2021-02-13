import { Module } from './core/decorators/module.decorator';
import { DatabaseModule } from './database/database.module';
import { EmbedModule } from './modules/embed/embed.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ReactionsModule } from './modules/reactions/reactions.module';

@Module({
  modules: [QuestionsModule, EmbedModule, DatabaseModule, ReactionsModule],
})
export class AppModule {}
