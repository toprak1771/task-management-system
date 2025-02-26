import { Injectable } from '@nestjs/common';
import { SubTaskRepository } from './sub-task.repository';
import { CreateSubTaskDto } from './dto/create.sub-task.dto';
import { SubTaskDocument } from './schemas/sub-task.schema';

@Injectable()
export class SubTaskService {
    constructor(private readonly subTaskRepository:SubTaskRepository){}

    async create(data:CreateSubTaskDto):Promise<SubTaskDocument> {
        const createdSubTask = await this.subTaskRepository.create(data);
        return createdSubTask;
    }
}
