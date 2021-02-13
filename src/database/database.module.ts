import { Module } from '@src/core/decorators/module.decorator';
import { KnexClient } from './client';

@Module({
  providers: [KnexClient],
})
export class DatabaseModule {}
