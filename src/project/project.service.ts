import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDtoTask } from './dto/update.project.dto';
import { Project,ProjectDocument } from './schemas/project.schema';


@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository:ProjectRepository){}

    async create(data:CreateProjectDto):Promise<ProjectDocument> {
        const createdProject = await this.projectRepository.create(data);
        return createdProject;
    }

    async updateTask(data:UpdateProjectDtoTask):Promise<ProjectDocument> {
        const updatedProject = await this.projectRepository.updateTask(data);
        return updatedProject;
    }
}
