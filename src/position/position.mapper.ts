import { Position as PositionPrisma } from '@prisma/client';
import { Position } from './position';

const mapToPosition = ({ id, x, y, z,assetId }: PositionPrisma): Position => {
  return new Position({
    id,
    x,
    y,
    z,
    assetId

  });
};

export const mapToPositions = (positionPrisma: PositionPrisma[]): Position[] =>
  positionPrisma.map((position) => mapToPosition(position));

export const mapToSinglePosition = (positionPrisma: PositionPrisma): Position =>
mapToSinglePosition(positionPrisma);

export default { mapToPositions, mapToSinglePosition };
