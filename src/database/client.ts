import { Inject } from '@src/core/injector/inject.decorator';
import { Logger } from '@src/core/logger';
import Knex from 'knex';
import { DB_CONFIG } from './constants';
import { DatabaseConfig } from './types';

export class KnexClient {
  private _knex!: Knex;

  constructor(@Inject(DB_CONFIG) private config: DatabaseConfig, private logger: Logger) {
    this.checkConnection();
  }

  private async checkConnection(): Promise<void> {
    try {
      await this.knex.raw('SELECT 1=1;');
    } catch (e) {
      this.logger.error(`No connection to database ${this.config.database} at host ${this.config.host}`);
      throw e;
    }
  }

  get knex(): Knex {
    if (!this._knex) {
      this._knex = Knex({
        connection: {
          ...this.config,
        },
        client: 'postgresql',
        pool: {
          min: 2,
          max: 10,
        },
      });
    }
    return this._knex;
  }
}
