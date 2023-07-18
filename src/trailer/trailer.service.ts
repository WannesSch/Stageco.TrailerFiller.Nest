import { HttpStatus, Injectable } from '@nestjs/common';
import { Asset } from 'src/asset/asset';
import {Trailer} from 'src/trailer/trailer'
import trailerDb from './trailer.db';
import { max } from 'class-validator';

@Injectable()
export class TrailerService {
    getAllAssetsFromTrailer(id: string): Promise<Asset[]> {
        return trailerDb.getAllAssetsFromTrailer(id);
    }
    add(trailer: Trailer): Promise<Trailer>  {
        return trailerDb.add(trailer);
    }
    addAsset(id: string, asset: Asset): Promise<Trailer> {
        return trailerDb.addAsset(id, asset);
    }
    removeAsset(trailerid: string, id: string): Promise<Trailer>  {
        return trailerDb.removeAsset(trailerid, id);
    }
    addToSubproject(id: string, trailer: Trailer): Promise<Trailer>  {
        return trailerDb.addToSubproject(id, trailer);
    }

    getAllFromSubproject(id: string): Promise<Trailer[]>  {
        return trailerDb.getAllFromSubproject(id);
    }
    getAll(): Promise<Trailer[]> {
        return trailerDb.getAll();
    }
    getById(id: string): Promise<Trailer> {
        try {
            return trailerDb.getById(id);
        } catch (error) {
            HttpStatus.NOT_FOUND
        }
        
    }
    update(id: string, trailer: Trailer): Promise<Trailer> {
        return trailerDb.update(id, trailer);
    }
    
}
