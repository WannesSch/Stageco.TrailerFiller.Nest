import { Asset } from 'src/asset/asset';
import { Trailer } from 'src/trailer/trailer';

export class Subproject {
  readonly id: number;
  readonly title: string;
  readonly description?: string;
  readonly crewChief?: string;
  readonly departureDate?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly trailers?: Trailer[];
  readonly assets?: Asset[];
  readonly projectId?: string;

  constructor(subproject: {
    id: number;
    title: string;
    description?: string;
    crewChief?: string;
    departureDate?: string;
    createdAt?: string;
    updatedAt?: string;
    assets?: Asset[];
    trailers?: Trailer[];
    projectId?: string;
  }) {
    this.id = subproject.id;
    this.title = subproject.title;
    this.description = subproject.description;
    this.crewChief = subproject.crewChief;
    this.departureDate = subproject.departureDate;
    this.createdAt = subproject.createdAt;
    this.updatedAt = subproject.updatedAt;
    this.trailers = subproject.trailers;
    this.assets = subproject.assets;
    this.projectId = subproject.projectId;
  }
}
