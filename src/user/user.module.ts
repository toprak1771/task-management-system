import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema}],'users')],
  controllers: [UserController],
  providers: [UserRepository,UserService],
  exports:[UserService]
})
export class UserModule {}
