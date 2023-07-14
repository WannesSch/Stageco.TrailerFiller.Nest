import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Asset } from './asset';
import { AssetService } from './asset.service';


@Controller('api/v1/asset')
export class AssetController {
    constructor(private readonly assetService: AssetService){}
    @Get('/all')
    getAllAssets(): Asset[]{
        return this.assetService.getAllAssets();
    }
    @Get('/:id')
    getAssetById(@Param('id') id: string): Asset{
        return this.assetService.getAssetById();
    }
    @Get('/:id/weight')
    getAssetWeight(@Param('id') id: string): number{
        return this.assetService.getAssetWeight(id);
    }
    @Get('/:unit')
    getAssetByUnit(@Param('unit') unit: string): Asset[]{
        return this.assetService.getAssetsByUnit(unit);
    }
    @Put('/update/:id')
    updateAsset(@Body() asset: Asset): Asset{
        return this.assetService.updateAsset(asset);
    }
    




}
