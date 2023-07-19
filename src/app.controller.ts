import { AppService } from './app.service';
import { Controller,Get,Param, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}