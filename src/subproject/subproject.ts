import { Asset } from "prisma/prisma-client";
import { Trailer } from "prisma/prisma-client";
import { Subproject as SubprojectPrisma} from "prisma/prisma-client";

export class Subproject{
    
    readonly subprojectId: number;
    readonly title: string;
    readonly description?: string;
    readonly departureDate?: Date;
    readonly createdAt: Date;
    readonly updatedAt?: Date;
    readonly Trailers: any[];
    readonly Assets: any[];


    constructor(subproject:{subprojectId: number, title: string, description?: string, venueAddress?: string, crewChief?: string, departureDate?: Date, createdAt?: Date, updatedAt?: Date, Trailers?: Trailer[], Assets?: Asset[]}){
        this.subprojectId = subproject.subprojectId;
        this.title = subproject.title;
        this.description = subproject.description;
        this.departureDate = subproject.departureDate;
        this.createdAt = subproject.createdAt;
        this.updatedAt = subproject.updatedAt;
        this.Trailers = subproject.Trailers;
        this.Assets = subproject.Assets;
    }

        static create({subprojectId, title, description ,departureDate,createdAt,updatedAt,Trailers,Assets}):Subproject{
            return new Subproject({ subprojectId, title, description, departureDate, createdAt, updatedAt, Trailers, Assets});
        }
    }
