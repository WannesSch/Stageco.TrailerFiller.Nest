import { Content } from '../content/content';
import { Position } from '../position/position';
import { Rotation } from '../rotation/rotation';

export class Asset {
  readonly id: number;
  readonly unit: string;
  readonly name: string;
  readonly category: number;
  readonly height: number;
  readonly width: number;
  readonly depth: number;
  readonly weight?: number;
  readonly modelPath?: string;
  readonly position?: Position;
  readonly rotation?: Rotation;
  readonly content?: Content[];
  readonly isLocked : boolean;

  constructor(asset: {
    id: number;
    unit: string;
    name?: string;
    category?: number;
    content?: Content[];
    height: number;
    width: number;
    depth: number;
    weight?: number;
    modelPath?: string;
    position?: Position;
    rotation?: Rotation;
    isLocked?: boolean;
  }) {
    this.id = asset.id;
    this.unit = asset.unit;
    this.name = asset.name;
    this.category = asset.category;
    this.height = asset.height;
    this.width = asset.width;
    this.depth = asset.depth;
    this.weight = asset.weight;
    this.modelPath = asset.modelPath;
    this.position = asset.position;
    this.rotation = asset.rotation;
    this.content = asset.content;
  }
}
