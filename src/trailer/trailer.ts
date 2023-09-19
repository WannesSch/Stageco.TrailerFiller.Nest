import { Asset } from '../asset/asset';

export class Trailer {
  readonly id: number;
  readonly height: number;
  readonly width: number;
  readonly depth: number;
  readonly weight?: number;
  readonly type?: string;
  readonly maxWeight: number;
  readonly assets?: Asset[];

  constructor(trailer: {
    id: number;
    height: number;
    width: number;
    depth: number;
    weight?: number;
    type?: string;
    maxWeight?: number;
    assets?: Asset[];
  }) {
    this.id = trailer.id;
    this.height = trailer.height;
    this.width = trailer.width;
    this.depth = trailer.depth;
    this.type = trailer.type;
    this.weight = trailer.weight;
    this.maxWeight = trailer.maxWeight;
    this.assets = trailer.assets;
  }
}
