import { Injectable } from '@nestjs/common';
import assetDB from './asset.db';
import { Asset } from './asset';
import trailerDb from 'src/trailer/trailer.db';
import { Content } from 'src/content/content';

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
    setRotation(id: string, rotation: number[]) {
        assetDB.setRotation(id,rotation);
    }
    setPosition(id: string, position: number[]) {
        assetDB.setPosition(id,position);
    }

    addContent(id: string, content: Content[]) {
        throw new Error('Method not implemented.');
    }
    addAsset(asset: Asset) {
        throw new Error('Method not implemented.');
    }
    getAssetsByUnit(unit: string): Promise<Asset[]> {
        throw new Error('Method not implemented.');
    }
    getAssetWeight(id: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
    getAssetById(id:string): Promise<Asset> {
        return assetDB.getAssetById(id);
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