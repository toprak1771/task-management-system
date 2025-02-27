import { ProjectService } from "./project.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Next,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateProjectDto } from "./dto/create.project.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      console.log("createProjectDto:", createProjectDto);
      const createdProject = await this.projectService.create(createProjectDto);

      return res.status(201).json({
        data: createdProject,
        message: "Successfully project created.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      const {query:{id}} = req;
      const projects = await this.projectService.getAll({_id:typeof(id) !== "undefined" ? id : null});

      return res.status(200).json({
        data:projects,
        message:'Succesfully listed projects.'
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
