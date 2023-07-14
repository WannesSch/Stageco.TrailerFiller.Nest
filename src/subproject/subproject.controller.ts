import { SubprojectService } from './subproject.service';
import { Controller,Body, Get, Param, Post, Put, Delete,  Res, HttpStatus, HttpException } from '@nestjs/common';
import { Subproject } from './subproject';
import { Asset } from 'src/asset/asset';
import { Trailer } from 'src/trailer/trailer';
import { error } from 'console';

@Controller('subproject')
export class SubprojectController {
    HTTPStatus: any;
    constructor(private subprojectService: SubprojectService){}
    @Get('all')
        async getAllSubprojects(): Promise<Subproject[]> {
    return await this.subprojectService.getAllSubprojects();
    }
    
    @Get('/:id',)
        async getProjectById(@Param('id') id: string): Promise<Subproject> {
    const subproject = await this.subprojectService.getSubProjectById(id);
    if (typeof(subproject)==='undefined') {
        throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }
    return subproject;
    }

    @Delete('/:id')
    async deleteSubproject(@Param('id') id: string): Promise<void>{
         await this.subprojectService.deleteSubproject(id);
    }
    
    @Put('/update/:id')
    async updateSubproject(@Body() subproject: Subproject,@Param('id') id: string): Promise<void>{
        return await this.subprojectService.updateSubproject(id,subproject);
    }

    @Put('/addAssets/:id')
    addAssets(@Body() assets: Asset[], @Param('id') id: string): Promise<HttpStatus>{
        if(assets.length==0){
            throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
        }
        if(id==null){
            throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
        }
        this.subprojectService.addAssets(id,assets);
       return this.HTTPStatus.OK;
    }
    // @Put('/addTrailer/:id')
    // async addTrailer(@Body() trailer: Trailer, @Param('id') id: string): Promise<HttpStatus>{
    //       this.subprojectService.addTrailer(id,trailer);
    //         return this.HTTPStatus.OK;
            
    // }

}
