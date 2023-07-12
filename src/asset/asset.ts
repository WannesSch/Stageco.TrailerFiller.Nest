export interface Asset {
    readonly id: number;
    readonly unit: string;
    readonly name: string;
    readonly description: string;
    readonly content?: string;
    readonly height: number;
    readonly width: number;
    readonly depth: number;
    readonly weight: number;
    readonly modelPath?: string;
    readonly position?: number[];
    readonly rotation?: number[];
}