import { Subproject as SubprojectPrisma,
  Asset as AssetPrisma,  
  Trailer as TrailerPrisma
} from "@prisma/client";

import { Subproject } from "./subproject";
import { mapToTrailers } from "src/trailer/trailer.mapper";

const mapToSubproject = ({
    subprojectId,
    title,
    description,
    departureDate,
    createdAt,
    updatedAt,
    Trailers,
    Assets,
}: SubprojectPrisma &{Assets?: AssetPrisma[]} &{Trailers?:TrailerPrisma[]}): Subproject =>
  new Subproject({
    subprojectId,
    title,
    description,
    departureDate,
    createdAt,
    updatedAt,
    Trailers,
    Assets
  });

  export const mapToSubprojects = async (subprojectsPrisma: SubprojectPrisma[]): Promise<Subproject[]> =>
  subprojectsPrisma.map((subproject) => mapToSubproject(subproject));

export const mapToSingleSubproject = async (subprojectPrisma: SubprojectPrisma): Promise<Subproject> =>
  mapToSubproject(subprojectPrisma);

export default { mapToSubprojects, mapToSingleSubproject };