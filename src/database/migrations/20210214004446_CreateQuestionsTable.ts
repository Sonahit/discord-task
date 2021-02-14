import { QuestionsEntity } from '@src/modules/questions/questions.entity';
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (knex.schema.hasTable(QuestionsEntity.tableName)) return;
  await knex.schema.createTable(QuestionsEntity.tableName, (builder) => {
    builder.increments('id');
    builder.text('text');
  });
}

export async function down(knex: Knex): Promise<void> {
  if (!knex.schema.hasTable(QuestionsEntity.tableName)) return;
  await knex.schema.dropTable(QuestionsEntity.tableName);
}
