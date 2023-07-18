import { Asset } from "../asset/asset";

export class Trailer{
    readonly trailerId: number;
    readonly name: string;
    readonly height: number;
    readonly width: number;
    readonly depth: number;
    readonly weight?: number;
    readonly maxWeight: number;
    readonly Assets: Asset[];


constructor(trailer:{trailerId: number,name:string, height: number, width: number, depth: number, weight?: number, maxWeight?:number, Assets?: Asset[]}){
    this.trailerId = trailer.trailerId;
    this.name = trailer.name;
    this.height = trailer.height;
    this.width = trailer.width;
    this.depth = trailer.depth;
    this.weight = trailer.weight;
    this.maxWeight = trailer.maxWeight;
    this.Assets = trailer.Assets;
}

}
