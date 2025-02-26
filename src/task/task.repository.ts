import { Injectable,Inject } from "@nestjs/common";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDtoSubTask } from "./dto/update.task.dto";


@Injectable()
export class TaskRepository {
    constructor(@Inject('TASK_MODEL') private taskModel: Model<Task>){}

    async create(data:CreateTaskDto):Promise<TaskDocument> {
        const createdTask = new this.taskModel(data);
        return createdTask.save();
    }

    async updateSubTask(data:UpdateTaskDtoSubTask) : Promise<TaskDocument> {
        const updatedTask = await this.taskModel.findOneAndUpdate({_id:data._id},{$push:{subTasks:data.subTask_id}},{new:true});
        return updatedTask;
    }
}