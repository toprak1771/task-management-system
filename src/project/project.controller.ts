import { ProjectService } from './project.service';
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
  Res
} from "@nestjs/common";
import { CreateProjectDto } from './dto/create.project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @Post()
  async create(
    @Body() createProjectDto:CreateProjectDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ):Promise<void> {
    try {
      console.log("createProjectDto:",createProjectDto);
      const createdProject = await this.projectService.create(createProjectDto);

      return res.status(201).json({
        data:createdProject,
        message:'Successfully project created.'
      })
    } catch (error) {
      console.log("error:",error);
    }
    
  }
}
