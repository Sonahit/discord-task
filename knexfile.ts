require('ts-node/register');
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: resolve('./src/database/migrations'),
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: resolve('./src/database/migrations'),
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },
};
