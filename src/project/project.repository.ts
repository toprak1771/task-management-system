import { Injectable,Inject } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create.project.dto";
import { Project } from "./schemas/project.schema";
import { Model } from "mongoose";


@Injectable()
export class ProjectRepository {
    constructor(@Inject('PROJECT_MODEL') private projectModel: Model<Project>){}

    async create(data:CreateProjectDto):Promise<Project> {
        const createdProject = new this.projectModel(data);
        return createdProject.save();
    }
}