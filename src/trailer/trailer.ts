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
  readonly licensePlate?: string;
  readonly description?: string;

  constructor(trailer: {
    id: number;
    height: number;
    width: number;
    depth: number;
    weight?: number;
    type?: string;
    maxWeight?: number;
    licensePlate?: string;
    description?: string;
    assets?: Asset[];
  }) {
    this.id = trailer.id;
    this.height = trailer.height;
    this.width = trailer.width;
    this.depth = trailer.depth;
    this.type = trailer.type;
    this.weight = trailer.weight;
    this.description = trailer.description;
    this.licensePlate = trailer.licensePlate;
    this.type = trailer.type;
    this.maxWeight = trailer.maxWeight;
    this.assets = trailer.assets;
  }
}
