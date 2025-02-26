import { Injectable } from '@nestjs/common';
import { SubTaskRepository } from './sub-task.repository';
import { CreateSubTaskDto } from './dto/create.sub-task.dto';
import { SubTaskDocument } from './schemas/sub-task.schema';
import { TaskDocument } from 'src/task/schemas/task.schema';
import { TaskService } from 'src/task/task.service';
import { UpdateSubTaskDto } from './dto/update.sub-task.dto';

@Injectable()
export class SubTaskService {
    constructor(private readonly subTaskRepository:SubTaskRepository,private readonly taskService:TaskService){}

    async create(data:CreateSubTaskDto):Promise<SubTaskDocument> {
        const createdSubTask = await this.subTaskRepository.create(data);
        return createdSubTask;
    }

    async update(data:UpdateSubTaskDto):Promise<SubTaskDocument> {
        const updatedSubTask = await this.subTaskRepository.update(data);
        return updatedSubTask;
    }

    async updatePercentageTask(data:{task_id:string}):Promise<TaskDocument> {
        const subTasks = await this.subTaskRepository.getAll(data);
        let totalWeight:number = 0;
        let is_completed_weight:number = 0;

        for(const subTask of subTasks) {
            totalWeight += subTask.weight;
            if(subTask.is_complete === true) is_completed_weight += subTask.weight;
        }

        const taskPercentage:number = Number(((100 / totalWeight) * is_completed_weight).toFixed(2));

        const updatedTaskPercentage = await this.taskService.update({_id:data.task_id,percentage:taskPercentage});
        return updatedTaskPercentage;
    }

    async getAllwithTaskId(data:{task_id:string}):Promise<SubTaskDocument[]> {
        const subTasks = await this.subTaskRepository.getAll(data);
        return subTasks;
    }
}
