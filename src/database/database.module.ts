import { Module } from '@src/core/decorators/module.decorator';
import { KnexClient } from './client';
import { DB_CONFIG } from './constants';
import { DatabaseConfig } from './types';

@Module({
  providers: [
    KnexClient,
    {
      provide: DB_CONFIG,
      useValue: {
        host: process.env.DB_HOST || '127.0.0.1',
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
      } as Partial<DatabaseConfig>,
    },
  ],
})
export class DatabaseModule {}
