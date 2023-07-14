import { Asset } from "../asset/asset";

export class Trailer{
    readonly trailerId: number;
    readonly height: number;
    readonly width: number;
    readonly depth: number;
    readonly weight?: number;
    readonly maxWeight: number;
    readonly Assets: Asset[];


constructor(trailer:{trailerId: number, height: number, width: number, depth: number, weight?: number, maxWeight?:number, Assets?: Asset[]}){
    this.trailerId = trailer.trailerId;
    this.height = trailer.height;
    this.width = trailer.width;
    this.depth = trailer.depth;
    this.weight = trailer.weight;
    this.maxWeight = trailer.maxWeight;
    this.Assets = trailer.Assets;
}

static create({
    trailerId,
    height,
    width,
    depth,
    weight,
    maxWeight,
    Assets
}): Trailer {
    return new Trailer({ 
        trailerId,
        height,
        width,
        depth,
        weight,
        maxWeight,
        Assets
    });
}


}
