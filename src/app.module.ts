import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from "./task/task.module";
import { SubTaskModule } from "./sub-task/sub-task.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv'
dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot:'/static'
    }),
    ProjectModule,
    TaskModule,
    SubTaskModule,
    MongooseModule.forRoot(process.env.DATABASE_URL,{
      connectionName:'managements',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL_USER,{
      connectionName:'users',
    }),
    UserModule,     
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
