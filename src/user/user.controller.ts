import { Controller, Get, Post, Body, Patch, Param, Delete,Req,Res,Next, HttpException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto,@Req() req,@Res() res,@Next() next):Promise<void> {
    try {
      const createdUser = await this.userService.create(createUserDto);
      return res.status(201).json({
        message:'Created user succesfully',
        data:createdUser
      })
    } catch (error) {
      //error excetion çeşitlerini araştır
      throw new HttpException(error.message,error.status);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginUserDto:LoginUserDto,@Req() req,@Res() res):Promise<any> {
    return {User:req.user,message:'User logged in'};
  }

  @Get('/logout')
    async logouth(@Req() req):Promise<any> {
      req.session.destroy();
      return { message: 'The user session has ended' }
    }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
