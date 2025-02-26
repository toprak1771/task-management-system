import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { SubTaskModule } from './sub-task/sub-task.module';

@Module({
  imports: [DatabaseModule, ProjectModule, TaskModule, SubTaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
