
export class Asset {
    readonly id: number;
    readonly unit: string;
    readonly name: string;
    readonly description: string;
    readonly content?: Asset[];
    readonly height: number;
    readonly width: number;
    readonly depth: number;
    readonly weight: number;
    readonly modelPath?: string;
    readonly position: string;
    readonly rotation: string;



    constructor(asset:{id: number, unit: string, name?: string, description?: string, content?: Asset[], height: number, width: number, depth: number, weight: number, modelPath?: string, position?: string, rotation?: string}){

        this.id = asset.id;
        this.unit = asset.unit;
        this.name = asset.name;
        this.description = asset.description;
        this.content = asset.content;
        this.height = asset.height;
        this.width = asset.width;
        this.depth = asset.depth;
        this.weight = asset.weight;
        this.modelPath = asset.modelPath;
        this.position = asset.position;
        this.rotation = asset.rotation;

    }
}

