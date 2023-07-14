import { Asset as AssetPrisma } from "@prisma/client";
import { Asset } from "./asset";


// const calcposition = (position: number[]): string => {
//     let positionxyz = '';
//       let positionx = position[0].toString();
//       let positiony = position[1].toString();
//       let positionz = position[2].toString();
//       let positionxyzPart = positionx + ',' + positiony + ',' + positionz;
//       positionxyz += positionxyzPart;
//       return positionxyz;
//     }
  
//     const positionArray = position ? JSON.parse(calcposition(position)) : undefined;
//     const rotationArray = rotation ? JSON.parse(calcposition(rotation)) : undefined;
// const parsePosition = (positionString: string): number[] => {
//     const positionArray: number[] = [];
//     const positionParts = positionString.split(',');
//       const positionx = parseFloat(positionParts[0]);
//       const positiony = parseFloat(positionParts[1]);
//       const positionz = parseFloat(positionParts[2]);
//       positionArray.push(positionx, positiony, positionz);
//     return positionArray;
//   };
const mapToAsset = ({
  id,
  unit,
  name,
  category,
  content,
  height,
  width,
  depth,
  weight,
  modelPath,
  position,
  rotation,
}: AssetPrisma & { content?: AssetPrisma[] }): Asset => {
    
  return new Asset({
    id,
    unit,
    name,
    category,
    content,
    height,
    width,
    depth,
    weight,
    modelPath,
    position,
    rotation
  });
};

export const mapToAssets = (assetsPrisma: AssetPrisma[]): Asset[] =>
  assetsPrisma.map((asset) => mapToAsset(asset));

export const mapToSingleAsset = (assetPrisma: AssetPrisma): Asset =>
  mapToAsset(assetPrisma);

export default { mapToAssets, mapToSingleAsset };


