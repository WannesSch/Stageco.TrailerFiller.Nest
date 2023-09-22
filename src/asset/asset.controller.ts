import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Asset } from './asset';
import { AssetService } from './asset.service';
import { HttpExceptionFilter } from '../validation/http-exception';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import endpoint from 'src/endpoint.roles';
@UseGuards(RolesGuard)


@Controller('api/v1/asset')
@UseFilters(HttpExceptionFilter)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @SetMetadata('roles', endpoint.allAssets)
  @Get('/all')
  getAllAssets(): Promise<Asset[]> {
    return this.assetService.getAllAssets();
  }
  @SetMetadata('roles', endpoint.allAssetsNoContent)
  @Get('/getAllNoContent')
  getAllAssetsZonderContent(): Promise<Asset[]> {
    return this.assetService.getAllNoContent();
  }
  @SetMetadata('roles', endpoint.getAsset)
  @Get('/get/:id')
  getAssetById(@Param('id') id: string): Promise<Asset> {
    return this.assetService.getAssetById(id);
  }
  @SetMetadata('roles', endpoint.updateAsset)
  @Put('/update/:id')
  updateAsset(
    @Body() asset: Asset,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return this.assetService.updateAsset(id, asset);
  }
  @SetMetadata('roles', endpoint.addAsset)
  @Post('/add')
  addAsset(@Body() asset: Asset): Promise<Asset | HttpStatus> {
    return this.assetService.addAsset(asset);
  }
  @SetMetadata('roles', endpoint.deleteAsset)
  @Post('/delete/:id')
  deleteAsset(@Param('id') id: string): Promise<HttpStatus> {
    return this.assetService.deleteAsset(id);
}
}

