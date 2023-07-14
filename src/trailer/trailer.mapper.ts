import { Trailer as TrailerPrisma, Asset as AssetPrisma } from "@prisma/client";

import { Trailer } from "./trailer";

const mapToTrailer = ({
    id: trailerId,
    height,
    width,
    depth,
    weight,
    maxWeight,
    Assets,
  
}: TrailerPrisma &{Assets?: AssetPrisma[]}): Trailer =>
  new Trailer({
    trailerId,
    height,
    width,
    depth,
    weight,
    maxWeight,
    Assets,
  });

export const mapToTrailers = (trailersPrisma: TrailerPrisma[]): Trailer[] =>
  trailersPrisma.map((trailer) => mapToTrailer(trailer));

export const mapToSingleTrailer = (trailerPrisma: TrailerPrisma): Trailer =>
  mapToTrailer(trailerPrisma);

export default { mapToTrailers, mapToSingleTrailer };
