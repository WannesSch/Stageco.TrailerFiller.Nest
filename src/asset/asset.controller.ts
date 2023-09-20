import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Asset } from './asset';
import { AssetService } from './asset.service';
import { HttpExceptionFilter } from '../validation/http-exception';
import { AuthGuards } from '../auth/auth.guards';

@UseGuards(AuthGuards())
@Controller('api/v1/asset')

@UseFilters(HttpExceptionFilter)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('/all')
  getAllAssets(): Promise<Asset[]> {
    return this.assetService.getAllAssets();
  }

  @Get('/getAllNoContent')
  getAllAssetsZonderContent(): Promise<Asset[]> {
    return this.assetService.getAllNoContent();
  }

  @Get('/get/:id')
  getAssetById(@Param('id') id: string): Promise<Asset> {
    return this.assetService.getAssetById(id);
  }

  @Put('/update/:id')
  updateAsset(
    @Body() asset: Asset,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return this.assetService.updateAsset(id, asset);
  }
  @Post('/add')
  addAsset(@Body() asset: Asset): Promise<Asset|HttpStatus> {
    return this.assetService.addAsset(asset);
  }
}

