
export class Content {
    readonly id: number;
    readonly unit: string;
    readonly name: string;
    readonly amount: number;
    readonly boxId: number;
    readonly weight?: number;



    constructor(content:{id: number, unit: string, name?: string, amount?: number, boxId?: number, weight?: number}){
        this.id = content.id;
        this.unit = content.unit;
        this.name = content.name;
        this.amount = content.amount;
        this.boxId = content.boxId;
        this.weight = content.weight;

    }
}

