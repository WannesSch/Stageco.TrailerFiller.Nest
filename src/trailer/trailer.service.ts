import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Asset } from 'src/asset/asset';
import { Trailer } from 'src/trailer/trailer';
import trailerDb from './trailer.db';

@Injectable()
export class TrailerService {
  getAllAssetsFromTrailer(id: string): Promise<Asset[]> {
    return trailerDb.getAllAssetsFromTrailer(id);
  }
  addAsset(id: string, asset:Asset): Promise<HttpStatus | HttpException> {
    return trailerDb.addAsset(id, asset);
  }
  removeAsset(trailerid: string, id: string): Promise<HttpStatus> {
    return trailerDb.removeAsset(trailerid, id);
  }
  addTrailer(id: string, trailer: Trailer): Promise<HttpStatus> {
    return trailerDb.addTrailer(id, trailer);
  }
  delete(id: string): Promise<HttpStatus> {
    return trailerDb.deleteTrailerById(Number(id));
  }


  getAllFromSubproject(id: string): Promise<Trailer[]> {
    return trailerDb.getAllFromSubproject(id);
  }
  getAll(): Promise<Trailer[]> {
    return trailerDb.getAll();
  }
  getById(id: string): Promise<Trailer> {
    try {
      return trailerDb.getById(id);
    } catch (error) {
      HttpStatus.NOT_FOUND;
    }
  }
  update(id: string, trailer: Trailer): Promise<HttpStatus> {
    return trailerDb.update(id, trailer);
  }
}
