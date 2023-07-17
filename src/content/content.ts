
export class Content {
    readonly id: number;
    readonly unit: string;
    readonly name: string;
    readonly amount: number;
    readonly bakId: number;
    readonly weight?: number;



    constructor(content:{id: number, unit: string, name?: string, amount?: number, bakId?: number, weight?: number}){
        this.id = content.id;
        this.unit = content.unit;
        this.name = content.name;
        this.amount = content.amount;
        this.bakId = content.bakId;
        this.weight = content.weight;

    }
}

