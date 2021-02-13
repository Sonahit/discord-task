import { Module } from '@src/core/decorators/module.decorator';
import { ReactionsService } from './reactions.service';

@Module({
  providers: [ReactionsService],
})
export class ReactionsModule {}
