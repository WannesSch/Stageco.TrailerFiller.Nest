import { AppService } from './app.service';
import { Controller,Get,Param, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csv-parser';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { Asset } from './asset/asset';
import { Asset as AssetPrisma } from "@prisma/client";
import database from './prisma/database';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}