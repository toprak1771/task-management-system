import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Next,
  HttpException,
  HttpStatus,
  Put,
  Get,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create.task.dto";
import { ProjectService } from "src/project/project.service";
import { UpdateTaskDto } from "./dto/update.task.dto";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiQuery,
} from "@nestjs/swagger";
import { UpdateProjectDto } from "src/project/dto/update.project.dto";
import { TaskDto, UpdateWeightCompleteTaskDto } from "./dto/task.dto";

@ApiTags("task")
@Controller("task")
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Created a new task." })
  @ApiCreatedResponse({
    description: "Successfully task created.",
    type: CreateTaskDto,
  })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @ApiBody({ type: CreateTaskDto }) 
  async create(
    @Body() createtaskDto: CreateTaskDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      console.log("createtaskDto:", createtaskDto);
      const createdTask = await this.taskService.create(createtaskDto);

      const updatedProject = await this.projectService.updateTask({
        _id: createdTask.project_id.toString(),
        task_id: createdTask._id,
      });

      //weight üzerinden proje percentage hesapları
      const changeProjectPercentage =
        await this.taskService.updatePercentageProject({
          project_id: createdTask.project_id.toString(),
        });

      return res.status(201).json({
        data: createdTask,
        message: "Successfully task created.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiOperation({ summary: "Update a new task." })
  @ApiCreatedResponse({
    description: "Successfully task updated and change percentage of project.",
    type: UpdateWeightCompleteTaskDto,
  })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @ApiBody({ type: UpdateWeightCompleteTaskDto }) 
  async update(
    @Body() updatetaskDto: UpdateTaskDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      console.log("updatetaskDto:", updatetaskDto);
      const updatedTask = await this.taskService.update(updatetaskDto);
      console.log("updatedTask:", updatedTask);

      const changeProjectPercentage =
        await this.taskService.updatePercentageProject({
          project_id: updatedTask.project_id.toString(),
        });

      return res.status(200).json({
        data: updatedTask,
        message: "Successfully task updated and change percentage of project.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get All tasks." })
  @ApiOkResponse({ description: "Succesfully listed projects.", type: TaskDto })
  @ApiBadRequestResponse({description:'Project id is required'})
  @ApiQuery({name:'project_id',required:true,type:String})
  async getAll(@Req() req, @Res() res, @Next() next): Promise<void> {
    try {
      const {
        query: { project_id },
      } = req;
      if(!project_id) {
        throw new HttpException('Project id is required', HttpStatus.BAD_REQUEST);
      }
      const getAllTasks = await this.taskService.getAllwithProjectId({
        project_id: project_id,
      });

      return res.status(200).json({
        data: getAllTasks,
        message: "Successfully task listed.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
