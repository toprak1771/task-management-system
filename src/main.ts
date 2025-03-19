import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common';
dotenv.config();
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session({
    secret:'keyboard',
    resave:false,
    saveUninitialized:false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  const config = new DocumentBuilder()
    .setTitle('Task Management Example')
    .setDescription('Task Management API Description')
    .setVersion('1.0.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
