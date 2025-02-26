import { Module } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { SubTaskController } from './sub-task.controller';
import { subTaskProviders } from './sub-task.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [SubTaskController],
  providers: [SubTaskService,...subTaskProviders],
})
export class SubTaskModule {}
