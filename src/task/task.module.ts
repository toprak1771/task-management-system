import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { ProjectModule } from 'src/project/project.module';
import { Task,taskSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:Task.name,schema:taskSchema}]),ProjectModule],
  controllers: [TaskController],
  providers: [TaskRepository,TaskService],
  exports:[TaskService]
})
export class TaskModule {}
