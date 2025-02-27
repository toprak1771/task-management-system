import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectController } from './project.controller';
import { projectProviders } from './project.provider';
import { DatabaseModule } from 'src/database/database.module';
import { Multer } from 'src/services/multer';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectController],
  providers: [ProjectRepository,ProjectService,...projectProviders,Multer],
  exports:[ProjectService]
})
export class ProjectModule {}
