import { Trailer as TrailerPrisma, Asset as AssetPrisma } from "@prisma/client";

import { Trailer } from "./trailer";

const mapToTrailer = ({
    id: trailerId,
    height,
    name,
    width,
    depth,
    weight,
    maxWeight,
    Assets,
  
}: TrailerPrisma &{Assets?: AssetPrisma[]}): Trailer =>
  new Trailer({
    trailerId,
    name,
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
