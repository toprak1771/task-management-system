import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectController } from './project.controller';
import { Multer } from 'src/services/multer';
import { Project,projectSchema } from './schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:Project.name,schema:projectSchema}],'managements')],
  controllers: [ProjectController],
  providers: [ProjectRepository,ProjectService,Multer],
  exports:[ProjectService]
})
export class ProjectModule {}
