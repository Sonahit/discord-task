import { TaskEntity } from '@src/modules/tasks/task.entity';
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (knex.schema.hasTable(TaskEntity.tableName)) return;
  await knex.schema.createTable(TaskEntity.tableName, (builder) => {
    builder.increments('id');
    builder.text('text');
  });
}

export async function down(knex: Knex): Promise<void> {
  if (!knex.schema.hasTable(TaskEntity.tableName)) return;
  await knex.schema.dropTable(TaskEntity.tableName);
}
