import { Module } from '@src/core/decorators/module.decorator';
import { AddTaskCommand } from './commands/add-task.command';
import { DeleteTaskCommand } from './commands/delete-task.command';
import { GetTaskCommand } from './commands/get-task.command';
import { TaskRepository } from './task.repository';

@Module({
  commands: [AddTaskCommand, DeleteTaskCommand, GetTaskCommand],
  providers: [TaskRepository],
})
export class TaskModule {}
