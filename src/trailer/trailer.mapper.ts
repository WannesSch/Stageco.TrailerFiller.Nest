import { Trailer as TrailerPrisma, Asset as AssetPrisma } from '@prisma/client';

import { Trailer } from './trailer';

const mapToTrailer = ({
  id,
  height,
  width,
  depth,
  type,
  weight,
  type,
  maxWeight,
  description,
  licensePlate,
  assets,
}: TrailerPrisma & { assets?: AssetPrisma[] }): Trailer =>
  new Trailer({
    id,
    height,
    width,
    depth,
    type,
    weight,
    maxWeight,
    description,
    licensePlate,
    assets,
  });

export const mapToTrailers = (trailersPrisma: TrailerPrisma[]): Trailer[] =>
  trailersPrisma.map((trailer) => mapToTrailer(trailer));

export const mapToSingleTrailer = (trailerPrisma: TrailerPrisma): Trailer =>
  mapToTrailer(trailerPrisma);

export default { mapToTrailers, mapToSingleTrailer };
