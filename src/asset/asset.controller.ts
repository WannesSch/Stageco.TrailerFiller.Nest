import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Asset } from './asset';
import { AssetService } from './asset.service';


@Controller('api/v1/asset')
export class AssetController {
    constructor(private readonly assetService: AssetService){}

    @Post('/csvToAssets/:filename')
    csvToAssets(@Param('filename') filename: string): Promise<Asset[]>{
        return this.assetService.csvToAssets(filename);
    }
    
    @Get('/all')
    getAllAssets(): Promise<Asset[]>{
        return this.assetService.getAllAssets();
    }
    
    @Get('/:id')
    getAssetById(@Param('id') id: string): Promise<Asset>{
        return this.assetService.getAssetById();
    }

    @Get('/:id/weight')
    getAssetWeight(@Param('id') id: string): Promise<number>{
        return this.assetService.getAssetWeight(id);
    }
    @Get('/:unit')
    getAssetByUnit(@Param('unit') unit: string): Promise<Asset[]>{
        return this.assetService.getAssetsByUnit(unit);
    }
    @Put('/update/:id')
    updateAsset(@Body() asset: Asset,@Param('id') id:string): Promise<void>{
        this.assetService.updateAsset(id,asset);
        return void 0;
    }
    




}
