import { Asset as AssetPrisma } from '@prisma/client';
import { Asset } from './asset';
import { Content as ContentPrisma } from '@prisma/client';

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
}: AssetPrisma & { content?: ContentPrisma[] }): Asset => {
  return new Asset({
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
};

export const mapToAssets = (assetsPrisma: AssetPrisma[]): Asset[] =>
  assetsPrisma.map((asset) => mapToAsset(asset));

export const mapToSingleAsset = (assetPrisma: AssetPrisma): Asset =>
  mapToAsset(assetPrisma);

export default { mapToAssets, mapToSingleAsset };
