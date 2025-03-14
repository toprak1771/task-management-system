import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { SubTaskRepository } from './sub-task.repository';
import { TaskModule } from 'src/task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { subTaskSchema,SubTask } from './schemas/sub-task.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:SubTask.name,schema:subTaskSchema}]),TaskModule],
  controllers: [SubTaskController],
  providers: [SubTaskRepository,SubTaskService],
})
export class SubTaskModule {}
