import { HttpStatus, Injectable } from '@nestjs/common';
import subprojectDB from './subproject.db';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';
import { Asset } from 'src/asset/asset';

@Injectable()
export class SubprojectService {
    deleteAsset(id: string, assetId: string): HttpStatus | PromiseLike<HttpStatus> {
        throw new Error('Method not implemented.');
    }
    getAllTrailersFromSubproject(id: string): Promise<Trailer[]> {
        return subprojectDB.getAllTrailersFromSubproject(id);
    }
    getAllAssetsFromSubproject(id: string): Promise<Asset[]> {
        return subprojectDB.getAllAssetsFromSubproject(id);
    }
    getAllSubprojectsFromProject(id: string): Promise<Subproject[]> {
        return subprojectDB.getAllSubprojectsFromProject(id);
    }
    addSubproject(id:string,subproject: Subproject):Promise<HttpStatus> {
        return subprojectDB.addSubproject(id,subproject);
    }

    
    addAssets(id: string, assets: Asset[]):Promise<HttpStatus>{
        return subprojectDB.addAssets(id,assets);
    }
    updateSubproject(id: string ,subproject: Subproject):Promise<HttpStatus>  {
        return subprojectDB.updateSubproject(id,subproject);
    }
    deleteSubproject(id: string):Promise<HttpStatus> {
        return subprojectDB.deleteSubproject(id);
    }
    getSubProjectById(id: string): Promise<Subproject> {
        return subprojectDB.getSubprojectById(id);
    }
    getAllSubprojects() : Promise<Subproject[]> {
        return subprojectDB.getSubprojects();
    }
    csvReader(filename:string,id:string): Promise<Asset[]|HttpStatus> {
        return subprojectDB.csvReader(filename,id);
    }


}