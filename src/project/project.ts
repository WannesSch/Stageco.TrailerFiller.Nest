import { Subproject } from "prisma/prisma-client";
import { Project as ProjectPrisma} from "prisma/prisma-client";


export class Project {
    readonly id : number;
    readonly title : string;
    readonly description : string;
    readonly venueAddress : string;
    readonly crewChief : string;
    readonly createdAt : Date;
    readonly updatedAt : Date;
    readonly Subprojects : Subproject[];

    constructor(project:{id: number, title: string, description?: string, venueAddress?: string, crewChief?: string, createdAt?: Date, updatedAt?: Date, Subprojects?: Subproject[]}){
        this.id = project.id;
        this.title = project.title;
        this.description = project.description;
        this.venueAddress = project.venueAddress;
        this.crewChief = project.crewChief;
        this.createdAt = project.createdAt;
        this.updatedAt = project.updatedAt;
        this.Subprojects = project.Subprojects;
    }

        static create({id, title, description ,venueAddress,crewChief,createdAt,updatedAt,Subprojects}):Project{
            return new Project({ id, title, description, venueAddress,crewChief, createdAt, updatedAt, Subprojects});
        }
    }
