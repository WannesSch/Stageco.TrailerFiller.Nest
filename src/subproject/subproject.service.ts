import { HttpStatus, Injectable } from '@nestjs/common';
import subprojectDB from './subproject.db';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';
import { Asset } from 'src/asset/asset';
import trailerDb from 'src/trailer/trailer.db';

@Injectable()
export class SubprojectService {
    // getAllTrailersFromSubproject(id: string): Promise<Trailer[]> {
    //     subprojectDB.getAllTrailersFromSubproject(id);
    // }
    getAllAssetsFromSubproject(id: string): Promise<Asset[]> {
        return subprojectDB.getAllAssetsFromSubproject(id);
    }
    getAllSubprojectsFromProject(id: string): Promise<Subproject[]> {
        return subprojectDB.getAllSubprojectsFromProject(id);
    }
    addTrailer(id: string, trailer: Trailer):Promise<HttpStatus> {
        return subprojectDB.addTrailer(id,trailer);
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


}