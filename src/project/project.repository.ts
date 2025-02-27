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

  async getAll():Promise<ProjectDocument[]> {
    const getAllProject = await this.projectModel.find().populate({
      path:'tasks',
      populate: {
        path:'subTasks'
      }
    });
    return getAllProject;
  }

  async getById(data:{_id:string}):Promise<ProjectDocument[]> {
    const getProject = await this.projectModel.find({_id:data._id}).populate({
      path:'tasks',
      populate: {
        path:'subTasks'
      }
    });
    return getProject;
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

  async updateFilePath(data:{_id:string,filePath:string}): Promise<ProjectDocument> {
    const updatedProject = await this.projectModel.findOneAndUpdate(
      { _id: data._id },
      { $push: { files: data.filePath } },
      { new: true },
    );
    return updatedProject;
  }

}
