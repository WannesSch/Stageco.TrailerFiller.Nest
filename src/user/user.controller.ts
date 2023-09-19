import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import  {UserService}  from './user.service';
import { User } from './user'; 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() name, password, @Res() res: Response) {
    try {
      const token = await this.userService.authenticate({name,password});
      res.status(HttpStatus.OK).json({ message: 'Authentication successful', token });
    } catch (error) {
      throw new HttpException({ status: 'error', errorMessage: error.message }, HttpStatus.UNAUTHORIZED);
    }
  }
  @Post('register')
    async register(@Body() user:User, @Res() res: Response) {
    try {
      const newUser = await this.userService.createUser(user);
      res.status(HttpStatus.OK).json({ message: 'User created', newUser });
    } catch (error) {
      throw new HttpException({ status: 'error', errorMessage: error.message }, HttpStatus.UNAUTHORIZED);
    }
}
}