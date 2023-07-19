import { Subproject } from "../subproject/subproject";


export class Project {
    readonly id : string;
    readonly title : string;
    readonly description : string;
    readonly venueAddress : string;
    readonly crewChief : string;
    readonly createdAt : string;
    readonly updatedAt : string;
    readonly subprojects : Subproject[];

    constructor(project:{id: string, title: string, description?: string, venueAddress?: string, crewChief?: string, createdAt?: string, updatedAt?: string, subprojects?: Subproject[]}){
        this.id = project.id;
        this.title = project.title;
        this.description = project.description;
        this.venueAddress = project.venueAddress;
        this.crewChief = project.crewChief;
        this.createdAt = project.createdAt;
        this.updatedAt = project.updatedAt;
        this.subprojects = project.subprojects;
    }
    }
