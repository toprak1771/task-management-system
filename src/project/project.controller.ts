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
  UseInterceptors,
} from "@nestjs/common";
import { CreateProjectDto } from "./dto/create.project.dto";
import { Multer } from "src/services/multer";
import { ApiTags,ApiOperation,ApiOkResponse,ApiCreatedResponse,ApiBadRequestResponse, ApiBody, ApiConsumes, ApiQuery } from "@nestjs/swagger";
import { ProjectDto } from "./dto/project.dto";
import { UpdateProjectDtoTask } from "./dto/update.project.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@ApiTags('project')
@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService,private readonly multerService:Multer) {}

  @Post()
  @ApiOperation({summary:'Created a new project.'})
  @ApiCreatedResponse({description:'Successfully project created.',type:CreateProjectDto})
  @ApiBadRequestResponse({description:'Invalid data provided'})
  @ApiBody({type:CreateProjectDto})
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
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('upload')
  @ApiOperation({summary:'Upload file.'})
  @ApiOkResponse({description:'Upload file successfully.'})
  @ApiBadRequestResponse({description:'Invalid data provided'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Project ID' },  // id parametresi
        files: { 
          type: 'string', 
          format: 'binary', 
          description: 'File to upload' 
        },  // file parametresi
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      const uploadFiles = await this.multerService.handleArrayUploadFile(req,res,"project");
      const updatedProject = await this.projectService.getFileUrl(uploadFiles.body.id,uploadFiles.files[0].path);
      
      return res.status(200).json({
        data:updatedProject,
        message:'Upload file successfully.'
      })

    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({summary:'Get All projects.'})
  @ApiOkResponse({description:'Succesfully listed projects.',type:ProjectDto})
  @ApiQuery({name:'id',required:false,type:String})
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
