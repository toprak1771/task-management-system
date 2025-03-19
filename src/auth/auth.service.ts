import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService){}

  async validateUser(email:string,password:string):Promise<UserDocument | null>{
    const user = await this.userService.getUser(email);
    const isMatch = await bcrypt.compare(password,user.password);

    if(!user) {
      throw new NotAcceptableException('Could not find user.')
    }
    if(user && isMatch) {
      return user;
    }
    return null;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
