import { Inject } from '@src/core/injector/inject.decorator';
import Knex from 'knex';
import { DB_CONFIG } from './constants';
import { DatabaseConfig } from './types';

export class KnexClient {
  private _knex!: Knex;
  constructor(@Inject(DB_CONFIG) private config: DatabaseConfig) {}

  get knex(): Knex {
    if (!this._knex) {
      this._knex = Knex({ ...this.config, client: 'postgres' });
    }
    return this._knex;
  }
}
