import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Request,
  UseGuards,
  Get,
  Param,
  SetMetadata,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from './user';
import { UserInput } from './userInput';
import endpoint from 'src/endpoint.roles';
import { RolesGuard } from 'src/auth/role.guard';

@UseGuards(RolesGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() userInput: UserInput, @Res() res: Response) {
    try {
      const token = await this.userService.authenticate(userInput);
      res
        .status(HttpStatus.OK)
        .json({
          message: 'Authentication successful',
          token,
          name: userInput.name,
        });
    } catch (error) {
      throw new HttpException(
        { status: 'error', errorMessage: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/register')
  async register(@Body() user: User, @Res() res: Response) {
    try {
      const newUser = await this.userService.createUser(user);
      res.status(HttpStatus.OK).json({ message: 'User created', newUser });
    } catch (error) {
      throw new HttpException(
        { status: 'error', errorMessage: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @SetMetadata('roles', endpoint.allUsers)
  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
  @SetMetadata('roles', endpoint.giveAdmin)
  @Post('giveAdmin')
  async giveAdmin(@Param('id') id): Promise<User> {
    return await this.userService.giveAdmin(id);
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
