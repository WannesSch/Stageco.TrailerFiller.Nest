import { SubprojectService } from './subproject.service';
import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Subproject } from './subproject';
import { Asset } from 'src/asset/asset';
import { Trailer } from 'src/trailer/trailer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/subproject')
export class SubprojectController {
  constructor(private subprojectService: SubprojectService) {}
  @Get('/all')
  async getAllSubprojects(): Promise<Subproject[]> {
    return await this.subprojectService.getAllSubprojects();
  }
  @Get('/getAllSubprojectsFromProject/:id')
  async getAllSubprojectsFromProject(
    @Param('id') id: string,
  ): Promise<Subproject[]> {
    return this.subprojectService.getAllSubprojectsFromProject(id);
  }
  @Post('/add/:id')
  async addSubproject(
    @Body() subproject: Subproject,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return await this.subprojectService.addSubproject(id, subproject);
  }

  @Get('/allAssetsFromSubproject/:id')
  async getAllAssetsFromSubproject(@Param('id') id: string): Promise<Asset[]> {
    return await this.subprojectService.getAllAssetsFromSubproject(id);
  }
  @Get('/allTrailersFromSubproject/:id')
  async getAllTrailersFromSubproject(
    @Param('id') id: string,
  ): Promise<Trailer[]> {
    return await this.subprojectService.getAllTrailersFromSubproject(id);
  }

  @Get('/get/:id')
  async getProjectById(@Param('id') id: string): Promise<Subproject> {
    return this.subprojectService.getSubProjectById(id);
  }

  @Delete('/delete/:id')
  async deleteSubproject(@Param('id') id: string): Promise<HttpStatus> {
    return await this.subprojectService.deleteSubproject(id);
  }

  @Put('/update/:id')
  async updateSubproject(
    @Body() subproject: Subproject,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return await this.subprojectService.updateSubproject(id, subproject);
  }

  @Put('/addAssets/:id')
  addAssets(
    @Body() assets: Asset[],
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return this.subprojectService.addAssets(id, assets);
  }
  @Delete('/deleteAsset/:id/:assetId')
  async deleteAsset(
    @Param('id') id: string,
    @Param('assetId') assetId: string,
  ): Promise<HttpStatus> {
    return await this.subprojectService.deleteAsset(id, assetId);
  }

  @Get('/:id/csvReader/:filename/')
  async csvReader(
    @Param('filename') filename: string,
    @Param('id') id: string,
  ): Promise<Asset[] | HttpStatus> {
    return this.subprojectService.csvReader(filename, id);
  }

  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id') id: string,
    @Body() formData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.subprojectService.uploadFile(id, file);
  }
}
