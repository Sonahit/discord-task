import { Module } from './core/decorators/module.decorator';
import { DatabaseModule } from './database/database.module';
import { EmbedModule } from './modules/embed/embed.module';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
  modules: [QuestionsModule, EmbedModule, DatabaseModule],
})
export class AppModule {}
