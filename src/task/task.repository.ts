import { Injectable, Inject } from "@nestjs/common";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDto, UpdateTaskDtoSubTask } from "./dto/update.task.dto";

@Injectable()
export class TaskRepository {
  constructor(@Inject("TASK_MODEL") private taskModel: Model<Task>) {}

  async create(data: CreateTaskDto): Promise<TaskDocument> {
    const createdTask = new this.taskModel(data);
    return createdTask.save();
  }

  async update(data: UpdateTaskDto): Promise<TaskDocument> {
    let updatedTask:TaskDocument;
    if (data.is_complete && data.is_complete === true) {
      updatedTask = await this.taskModel.findOneAndUpdate(
        { _id: data._id },
        { ...data, percentage: 100 },
        { new: true },
      );
    } else {
      updatedTask = await this.taskModel.findOneAndUpdate(
        { _id: data._id },
        data,
        { new: true },
      );
    }
    return updatedTask;
  }

  async updateSubTask(data: UpdateTaskDtoSubTask): Promise<TaskDocument> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: data._id },
      { $push: { subTasks: data.subTask_id } },
      { new: true },
    );
    return updatedTask;
  }

  async getAllTasks(data: { project_id: string }): Promise<TaskDocument[]> {
    const tasks = await this.taskModel
      .find({ project_id: data.project_id })
      .populate("subTasks");
    return tasks;
  }
}
