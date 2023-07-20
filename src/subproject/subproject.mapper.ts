import {
  Subproject as SubprojectPrisma,
  Asset as AssetPrisma,
  Trailer as TrailerPrisma,
} from '@prisma/client';

import { Subproject } from './subproject';

const mapToSubproject = ({
  id,
  title,
  description,
  departureDate,
  crewChief,
  createdAt,
  updatedAt,
  trailers,
  assets,
  projectId,
}: SubprojectPrisma & { assets?: AssetPrisma[] } & {
  trailers?: TrailerPrisma[];
}): Subproject =>
  new Subproject({
    id,
    title,
    description,
    crewChief,
    departureDate,
    createdAt,
    updatedAt,
    trailers,
    assets,
    projectId,
  });

export const mapToSubprojects = async (
  subprojectsPrisma: SubprojectPrisma[],
): Promise<Subproject[]> =>
  subprojectsPrisma.map((subproject) => mapToSubproject(subproject));

export const mapToSingleSubproject = async (
  subprojectPrisma: SubprojectPrisma,
): Promise<Subproject> => mapToSubproject(subprojectPrisma);

export default { mapToSubprojects, mapToSingleSubproject };
