import { Asset } from "prisma/prisma-client";
import { Trailer } from "prisma/prisma-client";
import { Subproject as SubprojectPrisma} from "prisma/prisma-client";

export class Subproject{
    
    readonly id: number;
    readonly title: string;
    readonly description?: string;
    readonly departureDate?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    readonly Trailers?: Trailer[];
    readonly Assets?: Asset[];
    readonly projectId?: string;


    constructor(subproject:{id: number, title: string, description?: string, crewChief?: string, departureDate?: string, createdAt?: string, updatedAt?: string, Trailers?: Trailer[], Assets?: Asset[], projectId?: string}){
        this.id = subproject.id;
        this.title = subproject.title;
        this.description = subproject.description;
        this.departureDate = subproject.departureDate;
        this.createdAt = subproject.createdAt;
        this.updatedAt = subproject.updatedAt;
        this.Trailers = subproject.Trailers;
        this.Assets = subproject.Assets;
        this.projectId = subproject.projectId;
    }

    }
