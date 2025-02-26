import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create.project.dto';


@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository:ProjectRepository){}

    async create(data:CreateProjectDto):Promise<any> {
        const createdProject = await this.projectRepository.create(data);
        return createdProject;
    }
}
