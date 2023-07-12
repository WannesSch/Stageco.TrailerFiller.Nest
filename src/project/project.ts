import { Asset } from "../asset/asset";
import { Trailer } from "../trailer/trailer";

export interface Project{
    readonly projectId: string;
    readonly title: string;
    readonly description?: string;
    readonly venueAddress?: string;
    readonly crewChief?: string;
    readonly departureDate?: Date;
    readonly createdAt: Date;
    readonly updatedAt?: Date;
    readonly Trailers?: Trailer[];
    readonly Assets?: Asset[];
}