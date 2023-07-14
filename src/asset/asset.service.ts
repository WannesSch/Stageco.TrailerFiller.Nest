import { Injectable } from '@nestjs/common';
import { Asset } from './asset';

@Injectable()
export class AssetService {
    getAssetsByUnit(unit: string): Asset[] {
        throw new Error('Method not implemented.');
    }
    updateAsset(asset: Asset): Asset {
        throw new Error('Method not implemented.');
    }
    getAssetWeight(id: string): number {
        throw new Error('Method not implemented.');
    }
    getAssetById(): Asset {
        throw new Error('Method not implemented.');
    }
    getAllAssets(): Asset[] {
        throw new Error('Method not implemented.');
    }
}
