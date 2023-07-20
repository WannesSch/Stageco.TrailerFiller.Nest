import { Asset } from "src/asset/asset";

export class Position {
    readonly id: number;
    readonly x?: number;
    readonly y?: number;
    readonly z?: number;
    readonly assetId?: number;
    readonly asset?: Asset;
  
    constructor(position: {
      id: number;
      x?: number;
      y?: number;
      z?: number;
      assetId?: number;
      asset?: Asset;
    }) {
      this.id = position.id;
     this.x = position.x;
      this.y = position.y;
      this.z = position.z;
      this.assetId = position.assetId;
      this.asset = position.asset;
    }
  }
  