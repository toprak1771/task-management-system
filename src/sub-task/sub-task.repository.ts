import { Injectable,Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { SubTask,SubTaskDocument } from "./schemas/sub-task.schema";
import { CreateSubTaskDto } from "./dto/create.sub-task.dto";

@Injectable()
export class SubTaskRepository {
    constructor(@Inject('SUBTASK_MODEL') private taskModel: Model<SubTask>){}

    async create(data:CreateSubTaskDto):Promise<SubTaskDocument> {
        const createdSubTask = new this.taskModel(data);
        return createdSubTask.save();
    }
}