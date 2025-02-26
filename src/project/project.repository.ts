import { Injectable, Inject } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create.project.dto";
import { Project,ProjectDocument } from "./schemas/project.schema";
import { Model } from "mongoose";
import { UpdateProjectDto, UpdateProjectDtoTask } from "./dto/update.project.dto";

@Injectable()
export class ProjectRepository {
  constructor(@Inject("PROJECT_MODEL") private projectModel: Model<Project>) {}

  async create(data: CreateProjectDto): Promise<ProjectDocument> {
    const createdProject = new this.projectModel(data);
    return await createdProject.save();
  }

  async updateProject(data:UpdateProjectDto):Promise<ProjectDocument> {
    const updatedProject = await this.projectModel.findOneAndUpdate({_id:data._id},data,{new:true});
    return updatedProject;
  }

  async updateTask(data: UpdateProjectDtoTask): Promise<ProjectDocument> {
    const updatedProject = await this.projectModel.findOneAndUpdate(
      { _id: data._id },
      { $push: { tasks: data.task_id } },
      { new: true },
    );
    return updatedProject;
  }

}
