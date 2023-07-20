
import { Rotation as RotationPrisma } from '@prisma/client';
import { Rotation } from './rotation';

const mapToRotation = ({
  id,
    x,
    y,
    z,

}: RotationPrisma): Rotation => {
  return new Rotation({
    id,
    x,
    y,
    z
  });
};

export const mapToRotations = (rotationPrisma: RotationPrisma[]): Rotation[] =>
rotationPrisma.map((rotation) => mapToRotation(rotation));

export const mapToSingleRotation = (rotationPrisma: RotationPrisma): Rotation =>
mapToSingleRotation(rotationPrisma);

export default { mapToRotations, mapToSingleRotation };
