import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { SubTask, SubTaskDocument } from "./schemas/sub-task.schema";
import { CreateSubTaskDto } from "./dto/create.sub-task.dto";
import { UpdateSubTaskDto } from "./dto/update.sub-task.dto";

@Injectable()
export class SubTaskRepository {
  constructor(@Inject("SUBTASK_MODEL") private subTaskModel: Model<SubTask>) {}

  async create(data: CreateSubTaskDto): Promise<SubTaskDocument> {
    const createdSubTask = new this.subTaskModel(data);
    return createdSubTask.save();
  }

  async update(data: UpdateSubTaskDto): Promise<SubTaskDocument> {
    let updatedSubTask: SubTaskDocument;
    if (data.is_complete && data.is_complete === true) {
      updatedSubTask = await this.subTaskModel.findOneAndUpdate(
        { _id: data._id },
        { ...data, percentage: 100 },
        { new: true },
      );
    } else {
      updatedSubTask = await this.subTaskModel.findOneAndUpdate(
        { _id: data._id },
        data,
        { new: true },
      );
    }

    return updatedSubTask;
  }

  async getAll(data: { task_id: string }): Promise<SubTaskDocument[]> {
    const subTasks = await this.subTaskModel
      .find({
        task_id: data.task_id,
      })
      .populate("task_id");

    return subTasks;
  }
}
