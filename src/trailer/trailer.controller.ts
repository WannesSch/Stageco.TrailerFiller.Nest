import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { Asset } from '../asset/asset';
import { Trailer } from 'src/trailer/trailer';
import { HttpExceptionFilter } from '../validation/http-exception';
import { Roles } from 'src/auth/role.decorator';
import  endpoint  from 'src/endpoint.roles';
import { RolesGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(RolesGuard)
@SetMetadata('roles', endpoint.allTrailer)
@Controller('api/v1/trailer')
@UseFilters(HttpExceptionFilter)
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}
  @Get('/all')
  
  async getAll(): Promise<Trailer[]> {
    return await this.trailerService.getAll();
  }
  @Get('/get/:id')
  async getById(@Param('id') id: string): Promise<Trailer> {
    return await this.trailerService.getById(id);
  }
  @Get('/allFromSubproject/:id')
  async getAllFromSubproject(@Param('id') id: string): Promise<Trailer[]> {
    return await this.trailerService.getAllFromSubproject(id);
  }

  @Get('/allAssetsFromTrailer/:id')
  async getAllAssetsFromTrailer(@Param('id') id: string): Promise<Asset[]> {
    return await this.trailerService.getAllAssetsFromTrailer(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<HttpStatus> {
    return await this.trailerService.delete(id);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() trailer: Trailer,
  ): Promise<HttpStatus> {
    return await this.trailerService.update(id, trailer);
  }
  @Put('/addAsset/:id')
  async addAssets(
    @Param('id') id: string,
    @Body() asset: Asset,
  ): Promise<HttpStatus | HttpException> {
    return await this.trailerService.addAsset(id, asset);
  }
  @Put('/:trailerid/removeAsset/:id')
  async removeAsset(
    @Param('trailerid') trailerid: string,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return await this.trailerService.removeAsset(trailerid, id);
  }
  @Post('/addTrailer/:id')
  async addTrailer(
    @Param('id') id: string,
    @Body() trailer: Trailer,
  ): Promise<HttpStatus> {
    return await this.trailerService.addTrailer(id, trailer);
  }
}
