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
import endpoint from 'src/endpoint.roles';
import { RolesGuard } from 'src/auth/role.guard';

@UseGuards(RolesGuard)
@Controller('api/v1/trailer')
@UseFilters(HttpExceptionFilter)
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @SetMetadata('roles', endpoint.allTrailer)
  @Get('/all')
  async getAll(): Promise<Trailer[]> {
    return await this.trailerService.getAll();
  }
  @SetMetadata('roles', endpoint.getTrailer)
  @Get('/get/:id')
  async getById(@Param('id') id: string): Promise<Trailer> {
    return await this.trailerService.getById(id);
  }
  @SetMetadata('roles', endpoint.allTrailersWithSubprojectId)
  @Get('/allFromSubproject/:id')
  async getAllFromSubproject(@Param('id') id: string): Promise<Trailer[]> {
    return await this.trailerService.getAllFromSubproject(id);
  }
  @SetMetadata('roles', endpoint.assetsFromTrailer)
  @Get('/allAssetsFromTrailer/:id')
  async getAllAssetsFromTrailer(@Param('id') id: string): Promise<Asset[]> {
    return await this.trailerService.getAllAssetsFromTrailer(id);
  }
  @SetMetadata('roles', endpoint.deleteTrailer)
  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<HttpStatus> {
    return await this.trailerService.delete(id);
  }
  @SetMetadata('roles', endpoint.updateTrailer)
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() trailer: Trailer,
  ): Promise<HttpStatus> {
    return await this.trailerService.update(id, trailer);
  }
  @SetMetadata('roles', endpoint.addAssetsToTrailer)
  @Put('/addAsset/:id')
  async addAssets(
    @Param('id') id: string,
    @Body() asset: Asset,
  ): Promise<HttpStatus | HttpException> {
    return await this.trailerService.addAsset(id, asset);
  }
  @SetMetadata('roles', endpoint.removeAssetFromTrailer)
  @Put('/:trailerid/removeAsset/:id')
  async removeAsset(
    @Param('trailerid') trailerid: string,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return await this.trailerService.removeAsset(trailerid, id);
  }
  @SetMetadata('roles', endpoint.addTrailer)
  @Post('/addTrailer/:id')
  async addTrailer(
    @Param('id') id: string,
    @Body() trailer: Trailer,
  ): Promise<HttpStatus> {
    return await this.trailerService.addTrailer(id, trailer);
  }
}
