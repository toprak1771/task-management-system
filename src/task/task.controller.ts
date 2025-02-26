import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Next,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create.task.dto";
import { ProjectService } from "src/project/project.service";

@Controller("task")
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
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

      return res.status(201).json({
        data: createdTask,
        message: "Successfully task created.",
      });
    } catch (error) {
      console.log("error:", error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
