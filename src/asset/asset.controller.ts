import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters } from '@nestjs/common';
import { Asset } from './asset';
import { AssetService } from './asset.service';
import {HttpExceptionFilter} from '../http-exception';
import { Content } from '../content/content';

@Controller('api/v1/asset')
@UseFilters(HttpExceptionFilter)
export class AssetController {
    constructor(private readonly assetService: AssetService){}

    @Post('/csvToAssets/:filename')
    csvToAssets(@Param('filename') filename: string,req: Request, res: Response): Promise<Asset[]>{
        try {
            return this.assetService.csvToAssets(filename);
        }
        catch(error){
            throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
        }
    }
    
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

    @Get('/getWeight/:id')
    getAssetWeight(@Param('id') id: string): Promise<number>{
        return this.assetService.getAssetWeight(id);
    }
    @Get('/getByUnit/:unit')
    getAssetByUnit(@Param('unit') unit: string): Promise<Asset[]>{
        return this.assetService.getAssetsByUnit(unit);
    }
    @Put('/update/:id')
    updateAsset(@Body() asset: Asset,@Param('id') id:string): Promise<void>{
        this.assetService.updateAsset(id,asset);
        return void 0;
    }
    @Post('/add')
    addAsset(@Body() asset: Asset): Promise<void>{    
            this.assetService.addAsset(asset);
        return void 0;
    }
    @Put('/addContent/:id')
    addContent(@Body() content: Content[],@Param('id') id: string): Promise<void>{
            this.assetService.addContent(id,content);
        return void 0;
    }

    @Put('/setPosition/:id')
    setPosition(@Param('id') id: string,@Body() position: number[]): Promise<void>{
        this.assetService.setPosition(id,position);
        return void 0;
    }
    @Put('/setRotation/:id')
    setRotation(@Param('id') id: string,@Body() rotation: number[]): Promise<void>{
        this.assetService.setRotation(id,rotation);
        return void 0;
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
