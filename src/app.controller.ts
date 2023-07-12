import { AppService } from './app.service';
import { Controller,Get,Param, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('getJson')
  getJson(): string {
    const workbook = XLSX.readFile('src/test.xlsm');
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    const jsonString = JSON.stringify(jsonData);
    const filteredData = JSON.stringify(jsonData).replace(/"__EMPTY_[^"]*"/g, '')
    .replace(/:/g, '')
    .replace(/"__EMPTY"/g, '')
    .replace(/\\/g, '')
    .replace(/\t/g, 'name')
    .replace(/B230008 - Bruce S./g, '')
    .replace(/"\*/g, '')
    .replace (/\\n/g, '')
    .replace(/\\"/g, '')
    .replace(/"/g, '')
    .replace(/,LL 15, 50, 51, 52, 53, 54, 55, 56, 57 - Set Hockenheimx/g, '');
    console.log(filteredData)
    return filteredData;
    // Handle the JSON data as needed (e.g., save it to a database, return it in the response, etc.)
  }
  @Get('getFile/:filename')
  getFile(@Param('filename') filename: string): string {
    const workbook = XLSX.readFile('src/'+filename+'.xlsm');
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    const jsonString = JSON.stringify(jsonData);
    const filteredData = JSON.stringify(jsonData).replace(/"__EMPTY_[^"]*"/g, '')
    .replace(/:/g, '')
    .replace(/"__EMPTY"/g, '')
    .replace(/\\/g, '')
    .replace(/\t/g, 'name')
    .replace(/B230008 - Bruce S./g, '')
    .replace(/"\*/g, '')
    .replace (/\\n/g, '')
    .replace(/\\"/g, '')
    .replace(/"/g, '')
    .replace(/,LL 15, 50, 51, 52, 53, 54, 55, 56, 57 - Set Hockenheimx/g, '')
    ;
    
    const filterededData = JSON.stringify(filteredData);
    console.log(filterededData)
    const destinationPath = 'src/bruce.json';
    fs.writeFileSync(destinationPath, filterededData);
    return filterededData;
    // Handle the JSON data as needed (e.g., save it to a database, return it in the response, etc.)
  }

}
