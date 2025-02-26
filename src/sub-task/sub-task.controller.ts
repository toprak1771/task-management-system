import { Controller, Post, Req, Res, Body, Next, HttpException, HttpStatus, Get, Put } from "@nestjs/common";
import { SubTaskService } from "./sub-task.service";
import { CreateSubTaskDto } from "./dto/create.sub-task.dto";
import { TaskService } from "src/task/task.service";
import { UpdateSubTaskDto } from "./dto/update.sub-task.dto";

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

      const updatedTaskPercentage = await this.subTaskService.updatePercentageTask({task_id:(createdSubTask.task_id).toString()});

      return res.status(201).json({
        data: createdSubTask,
        message: "Successfully task created.",
      });
    } catch (error) {
      console.log("error:",error.message);
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
    }
  }

  @Put()
  async update(
    @Body() updateSubTaskDto: UpdateSubTaskDto,
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      console.log("updateSubTaskDto:", updateSubTaskDto);
      const updatedSubTask = await this.subTaskService.update(updateSubTaskDto);

      const updatedTaskPercentage = await this.subTaskService.updatePercentageTask({task_id:(updatedSubTask.task_id).toString()});

      return res.status(201).json({
        data: updatedSubTask,
        message: "Successfully task created and changed percentage of relational task.",
      });
    } catch (error) {
      console.log("error:",error.message);
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  async getAll(
    @Req() req,
    @Res() res,
    @Next() next,
  ): Promise<void> {
    try {
      const {query:{task_id}} = req;
      const subTasks = await this.subTaskService.getAllwithTaskId({task_id:task_id});

      return res.status(200).json({
        data: subTasks,
        message: "Successfully subtasks listed.",
      });
    } catch (error) {
      console.log("error:",error.message);
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
    }
  }
}
