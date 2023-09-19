import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import  {UserService}  from './user.service';
import { User } from './user'; 
@Controller('api/v1/user')
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
    async register(@Body() name:string, password:string,email:string, @Res() res: Response) {
    try {
      console.log(name,password,email)
      
      const newUser = await this.userService.createUser({name,password,email});
      res.status(HttpStatus.OK).json({ message: 'User created', newUser });
    } catch (error) {
      throw new HttpException({ status: 'error', errorMessage: error.message }, HttpStatus.UNAUTHORIZED);
    }
}
}