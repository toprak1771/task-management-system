import { Controller, Post, Req, Res, Body, Next, HttpException, HttpStatus } from "@nestjs/common";
import { SubTaskService } from "./sub-task.service";
import { CreateSubTaskDto } from "./dto/create.sub-task.dto";
import { TaskService } from "src/task/task.service";

@Controller("sub-task")
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService,private readonly taskService:TaskService) {}

  @Post()
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
        _id:createdSubTask.task_id.toString(),
        subTask_id:createdSubTask._id
      })

      return res.status(201).json({
        data: createdSubTask,
        message: "Successfully task created.",
      });
    } catch (error) {
      console.log("error:",error.message);
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
    }
  }
}
