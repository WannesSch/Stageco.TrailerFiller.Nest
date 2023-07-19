import { HttpStatus, Injectable } from '@nestjs/common';
import assetDB from './asset.db';
import { Asset } from './asset';

@Injectable()
export class AssetService {
  getPosition(id: string): Promise<number[]> {
    return assetDB.getPosition(id);
  }
  getRotation(id: string): Promise<number[]> {
    return assetDB.getRotation(id);
  }
  getAllNoContent(): Promise<Asset[]> {
    return assetDB.getAllNoContent();
  }
  setRotation(id: string, rotation: number[]): Promise<HttpStatus> {
    return assetDB.setRotation(id, rotation);
  }
  setPosition(id: string, position: number[]): Promise<HttpStatus> {
    return assetDB.setPosition(id, position);
  }

  addAsset(asset: Asset): Promise<HttpStatus> {
    return assetDB.addAsset(asset);
  }

  getAssetById(id: string): Promise<Asset> {
    return assetDB.getAssetById(id);
  }

  updateAsset(id: string, asset: Asset) {
    return assetDB.updateAsset(id, asset);
  }
  deleteAsset(id: string) {
    return assetDB.deleteAsset(id);
  }

  getAllAssets = () => assetDB.getAssets();
}
