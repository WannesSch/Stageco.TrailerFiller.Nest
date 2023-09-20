import { mapToSingleAsset, mapToAssets } from './asset.mapper';
import { Asset } from './asset';
import database from '../prisma/database';
import { HttpStatus } from '@nestjs/common';

const getAssetById = async (id: string): Promise<Asset> => {
  const asset = await database.asset.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      content: true,
      position: true,
      rotation: true,
    },
  });
  return mapToSingleAsset(asset);
};

const deleteAsset = async (id: string): Promise<HttpStatus> => {
  const deletedAsset = await database.asset.delete({
    where: {
      id: parseInt(id),
    },
    include: {
      content: true,
      position: true,
      rotation: true,
    },
  });
  if (deletedAsset == null) return HttpStatus.BAD_REQUEST;
  return HttpStatus.CREATED;
};

const getAssets = async (): Promise<Asset[]> => {
  const assets = await database.asset.findMany({
    include: {
      content: true,
      position: true,
      rotation: true,
    },
  });
  return mapToAssets(assets);
};

const addAsset = async (asset: Asset): Promise<Asset|HttpStatus> => {
  const newAsset = await database.asset.create({
    data: {
      id: asset.id,
      unit: asset.unit,
      name: asset.name,
      category: asset.category,
      height: asset.height,
      width: asset.width,
      depth: asset.depth,
      weight: asset.weight,
      modelPath: asset.modelPath,
      position: {
        connect: { id: asset.position.id },
      },
      rotation: {
        connect: { id: asset.rotation.id },
      },
    },
  });
  if (mapToSingleAsset(newAsset) == null) return HttpStatus.BAD_REQUEST;
  return newAsset;
};

const updateAsset = async (id: string, asset: Asset): Promise<HttpStatus> => {
  const updatedAsset = await database.asset.update({
    where: {
      id: parseInt(id),
    },
    data: {
      id: parseInt(id),
      unit: asset.unit,
      name: asset.name,
      category: asset.category,
      height: asset.height,
      width: asset.width,
      depth: asset.depth,
      weight: asset.weight,
      modelPath: asset.modelPath,
      isLocked: asset.isLocked,
      position: {
        update: {
          x: asset.position.x,
          y: asset.position.y,
          z: asset.position.z,
        },
      },
      rotation: {
        update: {
          x: asset.rotation.x,
          y: asset.rotation.y,
          z: asset.rotation.z,
        },
      },
    },
    include: {
      content: true,
    },
  });

  if (mapToSingleAsset(updatedAsset) == null) return HttpStatus.I_AM_A_TEAPOT;
  return HttpStatus.OK;
};

const getAllNoContent = async (): Promise<Asset[]> => {
  const assets = await database.asset.findMany({
    include: {
      content: false,
    },
  });
  return mapToAssets(assets);
};

export default {
  getAssetById,
  getAssets,
  addAsset,
  updateAsset,
  deleteAsset,
  getAllNoContent,
};
