import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { subTaskProviders } from './sub-task.provider';
import { SubTaskRepository } from './sub-task.repository';
import { DatabaseModule } from 'src/database/database.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports:[DatabaseModule,TaskModule],
  controllers: [SubTaskController],
  providers: [SubTaskRepository,SubTaskService,...subTaskProviders],
})
export class SubTaskModule {}
