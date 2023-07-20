import { HttpStatus, Injectable } from '@nestjs/common';
import assetDB from './asset.db';
import { Asset } from './asset';

@Injectable()
export class AssetService {
  
  getAllNoContent(): Promise<Asset[]> {
    return assetDB.getAllNoContent();
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
