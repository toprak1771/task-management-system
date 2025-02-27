import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto, UpdateProjectDtoTask } from './dto/update.project.dto';
import { Project,ProjectDocument } from './schemas/project.schema';


@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository:ProjectRepository){}

    async create(data:CreateProjectDto):Promise<ProjectDocument> {
        const createdProject = await this.projectRepository.create(data);
        return createdProject;
    }

    async getAll(data:{_id:string}):Promise<ProjectDocument[]> {
        let projectDocument;
        if(data._id && data._id !== null) {
            projectDocument = await this.projectRepository.getById({_id:data._id});
            
        } else {
            projectDocument = await this.projectRepository.getAll();
        }

        return projectDocument;
    }

    async update(data:UpdateProjectDto):Promise<ProjectDocument> {
        const updatedProject = await this.projectRepository.updateProject(data);
        return updatedProject;
    }

    async updateTask(data:UpdateProjectDtoTask):Promise<ProjectDocument> {
        const updatedProject = await this.projectRepository.updateTask(data);
        return updatedProject;
    }

    async getFileUrl(_id:string,filePath:string):Promise<ProjectDocument> {
        const base_url = process.env.BASE_URL;

        const relativePath = filePath.split('public')[1];

        const formattedPath = relativePath.replace(/\\/g, '/');

        const _filePath = `${base_url}/static${formattedPath}`

        const updatedProject = await this.projectRepository.updateFilePath({_id:_id,filePath:_filePath});

        return updatedProject;
    }

    
}
