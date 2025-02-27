import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  Next,
  HttpException,
  HttpStatus,
  Get,
  Put,
} from "@nestjs/common";
import { SubTaskService } from "./sub-task.service";
import { CreateSubTaskDto } from "./dto/create.sub-task.dto";
import { TaskService } from "src/task/task.service";
import { UpdateSubTaskDto } from "./dto/update.sub-task.dto";
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
import { SubTaskDto, UpdateWeightCompleteSubTaskDto } from "./dto/subTask.dto";

@ApiTags("sub-task")
@Controller("sub-task")
export class SubTaskController {
  constructor(
    private readonly subTaskService: SubTaskService,
    private readonly taskService: TaskService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Created a new subTask." })
  @ApiCreatedResponse({
    description: "Successfully subtask created.",
    type: CreateSubTaskDto,
  })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @ApiBody({ type: CreateSubTaskDto })
  async create(
    @Body() createsubTaskDto: CreateSubTaskDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      console.log("createsubTaskDto:", createsubTaskDto);
      const createdSubTask = await this.subTaskService.create(createsubTaskDto);

      const updatedTask = await this.taskService.updateSubTask({
        _id: createdSubTask.task_id.toString(),
        subTask_id: createdSubTask._id,
      });

      const updatedTaskPercentage =
        await this.subTaskService.updatePercentageTask({
          task_id: createdSubTask.task_id.toString(),
        });

      return res.status(201).json({
        data: createdSubTask,
        message: "Successfully subtask created.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiOperation({ summary: "Update a new subTask." })
  @ApiOkResponse({
    description:
      "Successfully task created and changed percentage of relational task.",
    type: UpdateWeightCompleteSubTaskDto,
  })
  @ApiBadRequestResponse({ description: "Invalid data provided" })
  @ApiBody({ type: UpdateWeightCompleteSubTaskDto })
  async update(
    @Body() updateSubTaskDto: UpdateSubTaskDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      console.log("updateSubTaskDto:", updateSubTaskDto);
      const updatedSubTask = await this.subTaskService.update(updateSubTaskDto);

      const updatedTaskPercentage =
        await this.subTaskService.updatePercentageTask({
          task_id: updatedSubTask.task_id.toString(),
        });

      return res.status(201).json({
        data: updatedSubTask,
        message:
          "Successfully task created and changed percentage of relational task.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get All subTasks." })
  @ApiOkResponse({
    description: "Successfully subtasks listed.",
    type: SubTaskDto,
  })
  @ApiBadRequestResponse({ description: "task_id is required" })
  @ApiQuery({ name: "task_id", required: true, type: String })
  async getAll(@Req() req, @Res() res, @Next() next): Promise<void> {
    try {
      const {
        query: { task_id },
      } = req;
      if (!task_id) {
        throw new HttpException("task_id is required", HttpStatus.BAD_REQUEST);
      }
      const subTasks = await this.subTaskService.getAllwithTaskId({
        task_id: task_id,
      });

      return res.status(200).json({
        data: subTasks,
        message: "Successfully subtasks listed.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
