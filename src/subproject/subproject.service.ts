import { Injectable } from '@nestjs/common';
import subprojectDB from './subproject.db';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';
import trailerDb from 'src/trailer/trailer.db';

@Injectable()
export class SubprojectService {
    addTrailer(id: string, trailer: Trailer) {
        if(id == null || id == undefined || id == "")
        {
            throw new Error("id is null or undefined or empty");
        }
        if(trailer == null || trailer == undefined)
        {
            throw new Error("trailer is null or undefined");
        }
        trailerDb.addTrailer(trailer);
        subprojectDB.addTrailer(id,trailer);
    }
    addAssets(id: string, assets){
        subprojectDB.addAssets(id,assets);
    }
    updateSubproject(id: string ,subproject: Subproject)  {
        subprojectDB.updateSubproject(id,subproject);
    }
    deleteSubproject(id: string) {
        subprojectDB.deleteSubproject(id);
    }
    getSubProjectById(id: string) {
        subprojectDB.getSubprojectById(id);
    }

    getAllSubprojects = () => subprojectDB.getSubprojects();

}