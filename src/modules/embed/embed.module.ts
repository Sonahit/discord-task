import { Module } from '@src/core/decorators/module.decorator';
import { EmbedService } from './embed.service';

@Module({
  providers: [EmbedService],
})
export class EmbedModule {}
