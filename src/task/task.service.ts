import { Injectable } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { Task,TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDtoSubTask } from "./dto/update.task.dto";

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(data: CreateTaskDto): Promise<TaskDocument> {
    const createdTask = await this.taskRepository.create(data);
    return createdTask;
  }

  async updateSubTask(data:UpdateTaskDtoSubTask):Promise<TaskDocument> {
    const updatedTask = await this.taskRepository.updateSubTask(data);
    return updatedTask;
  }
}
