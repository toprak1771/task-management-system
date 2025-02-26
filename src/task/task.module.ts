import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { taskProviders } from './task.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [DatabaseModule,ProjectModule],
  controllers: [TaskController],
  providers: [TaskRepository,TaskService,...taskProviders],
  exports:[TaskService]
})
export class TaskModule {}
