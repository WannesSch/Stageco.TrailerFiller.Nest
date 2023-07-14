import { Injectable } from '@nestjs/common';
import assetDB from './asset.db';
import { Asset } from './asset';
import trailerDb from 'src/trailer/trailer.db';

@Injectable()
export class AssetService {
    getAssetsByUnit(unit: string): Promise<Asset[]> {
        throw new Error('Method not implemented.');
    }
    getAssetWeight(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
    getAssetById(): Promise<Asset> {
        throw new Error('Method not implemented.');
    }
    csvToAssets(filename: string): Promise<Asset[]>{
        return assetDB.csvToAssets(filename);
    }

    updateAsset(id: string ,asset: Asset)  {
        assetDB.updateAsset(id,asset);
    }
    deleteAsset(id: string) {
        assetDB.deleteAsset(id);
    }

    getAllAssets = () => assetDB.getAssets();

}