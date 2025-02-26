import { Injectable } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { Task, TaskDocument } from "./schemas/task.schema";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDto, UpdateTaskDtoSubTask } from "./dto/update.task.dto";
import { ProjectService } from "src/project/project.service";
import { ProjectDocument } from "src/project/schemas/project.schema";
import { Types } from "mongoose";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectService: ProjectService,
  ) {}

  async create(data: CreateTaskDto): Promise<TaskDocument> {
    const createdTask = await this.taskRepository.create(data);
    return createdTask;
  }

  async update(data:UpdateTaskDto):Promise<TaskDocument> {
    const updatedTask = await this.taskRepository.update(data);
    return updatedTask;
  }

  async getAllwithProjectId(data:{project_id:string}):Promise<TaskDocument[]> {
    const getAllTasks = await this.taskRepository.getAllTasks(data);
    return getAllTasks;
  }

  async updateSubTask(data: UpdateTaskDtoSubTask): Promise<TaskDocument> {
    const updatedTask = await this.taskRepository.updateSubTask(data);
    return updatedTask;
  }

  async updatePercentageProject(data: {
    project_id: string;
  }): Promise<ProjectDocument> {
    const getAllTasks = await this.taskRepository.getAllTasks(data);

    let totalWeight: number = 0;
    let is_completed_weight: number = 0;
    //let is_not_completed_weight: number = 0;

    for (const tasks of getAllTasks) {
      totalWeight += tasks.weight;
      if (tasks.is_complete === true) is_completed_weight += tasks.weight;
      //if (tasks.is_complete === false) is_not_completed_weight += tasks.weight;
    }

    const projectPercentage: number = Number(
      ((100 / totalWeight) * is_completed_weight).toFixed(2),
    );

    const updatedProjectPercentage = await this.projectService.update({
      _id: data.project_id,
      percentage: projectPercentage,
    });
    return updatedProjectPercentage;
  }
}
