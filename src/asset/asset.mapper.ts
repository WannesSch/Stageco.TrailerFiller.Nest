import { Asset as AssetPrisma } from '@prisma/client';
import { Asset } from './asset';
import { Content as ContentPrisma } from '@prisma/client';
import {Position as PositionPrisma} from '@prisma/client';
import {Rotation as RotationPrisma} from '@prisma/client';

const mapToAsset = ({
  id,
  unit,
  name,
  category,
  height,
  width,
  depth,
  weight,
  modelPath,
  position,
  rotation,
  content,
}: AssetPrisma & { position?: PositionPrisma } & {
  rotation?: RotationPrisma;
} & { content?: ContentPrisma[] }
): Asset =>
  new Asset({
    id,
    unit,
    name,
    category,
    height,
    width,
    depth,
    weight,
    modelPath,
    position,
    rotation,
    content,
  });

export const mapToAssets = (assetsPrisma: AssetPrisma[]): Asset[] =>
  assetsPrisma.map((asset) => mapToAsset(asset));

export const mapToSingleAsset = (assetPrisma: AssetPrisma): Asset =>
  mapToAsset(assetPrisma);

export default { mapToAssets, mapToSingleAsset };
