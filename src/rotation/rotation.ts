import { Asset } from 'src/asset/asset';

export class Rotation {
  readonly id: number;
  readonly x?: number;
  readonly y?: number;
  readonly z?: number;
  readonly assetId?: number;
  readonly asset?: Asset;

  constructor(rotation: {
    id: number;
    x: number;
    y: number;
    z: number;
    assetId?: number;
    asset?: Asset;
  }) {
    this.id = rotation.id;
    this.x = rotation.x;
    this.y = rotation.y;
    this.z = rotation.z;
    this.assetId = rotation.assetId;
    this.asset = rotation.asset;
  }
}
