import { Controller } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}
}
