import { Asset } from "../asset/asset";

export interface Trailer{
    readonly trailerId: number;
    readonly height: number;
    readonly width: number;
    readonly depth: number;
    readonly weight: number;
    readonly maxWeight: number;
    readonly Assets?: Asset[];

}
