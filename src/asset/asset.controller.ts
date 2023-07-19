import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { Asset } from './asset';
import { AssetService } from './asset.service';
import {HttpExceptionFilter} from '../validation/http-exception';
import { Content } from '../content/content';

@Controller('api/v1/asset')
@UseFilters(HttpExceptionFilter)
export class AssetController {
    constructor(private readonly assetService: AssetService){}

    
    
    @Get('/all')
    getAllAssets(): Promise<Asset[]>{
        return this.assetService.getAllAssets();
    }
    
    @Get('/getAllNoContent')
    getAllAssetsZonderContent(): Promise<Asset[]>{
        return this.assetService.getAllNoContent();
    }
    
    @Get('/get/:id')
    getAssetById(@Param('id') id: string): Promise<Asset>{
        return this.assetService.getAssetById(id);
    }

    
    @Put('/update/:id')
    updateAsset(@Body() asset: Asset,@Param('id') id:string): Promise<HttpStatus>{
        return this.assetService.updateAsset(id,asset);
    }
    @Post('/add')
    addAsset(@Body() asset: Asset): Promise<HttpStatus>{    
            return this.assetService.addAsset(asset);
    }

    @Put('/setPosition/:id')
    setPosition(@Param('id') id: string,@Body() position: number[]): Promise<HttpStatus>{
        return this.assetService.setPosition(id,position);

    }
    @Put('/setRotation/:id')
    setRotation(@Param('id') id: string,@Body() rotation: number[]): Promise<HttpStatus>{
        return this.assetService.setRotation(id,rotation);
    }
    @Get('/getRotation/:id')
    getRotation(@Param('id') id: string): Promise<number[]>{
        return this.assetService.getRotation(id);
    }
    @Get('/getPosition/:id')
    getPosition(@Param('id') id: string): Promise<number[]>{
        return this.assetService.getPosition(id);
    }


        
    




}
