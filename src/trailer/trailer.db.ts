import { mapToSingleTrailer, mapToTrailers } from './trailer.mapper';
import database from '../prisma/database';
import { Trailer } from './trailer';
import { Asset } from '../asset/asset';
import { HttpException, HttpStatus } from '@nestjs/common';
import { mapToSingleSubproject } from 'src/subproject/subproject.mapper';
import { mapToAssets } from 'src/asset/asset.mapper';

const getAll = async (): Promise<Trailer[]> => {
  const trailers = await database.trailer.findMany({
    include: {
      assets: true,
    },
  });
  return mapToTrailers(trailers);
};

const getAllAssetsFromTrailer = async (id: string): Promise<Asset[]> => {
  const assets = await database.asset.findMany({
    where: {
      trailerId: Number(id),
    },
    include: {
      content: true,
      position: true,
      rotation: true,
    },
  });
  return (assets);
};



const getById = async (id: string): Promise<Trailer> => {
  const trailer = await database.trailer.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      assets: true,
    },
  });
  return mapToSingleTrailer(trailer);
};
const update = async (id: string, trailer: Trailer): Promise<HttpStatus> => {
  const updatedTrailer = await database.trailer.update({
    where: {
      id: Number(id),
    },
    data: {
      height: trailer.height,
      width: trailer.width,
      depth: trailer.depth,
      weight: trailer.weight,
      type: trailer.type,
      description: trailer.description,
      licensePlate: trailer.licensePlate,
      maxWeight: trailer.maxWeight,
    },
  });
  if (mapToSingleTrailer(updatedTrailer) == null) {
    return HttpStatus.NOT_FOUND;
  }
  return HttpStatus.OK;
};
const getAllFromSubproject = async (id: string): Promise<Trailer[]> => {
  const trailer = await database.trailer.findMany({
    where: {
      subprojectId: Number(id),
    },
  });
  return mapToTrailers(trailer);
};

const addTrailer = async (
  id: string,
  trailer: Trailer,
): Promise<HttpStatus> => {
  const newTrailer = await database.trailer.create({
    data: {
      height: trailer.height,
      width: trailer.width,
      depth: trailer.depth,
      maxWeight: trailer.maxWeight,
      type: trailer.type,
      description: trailer.description,
      licensePlate: trailer.licensePlate,
      subprojectId: parseInt(id),
    },
  });
  const updatedSubproject = await database.subproject.update({
    where: {
      id: Number(id),
    },
    data: {
      trailers: {
        connect: { id: newTrailer.id },
      },
    },
    include: {
      trailers: true,
      assets: true,
    },
  });
  if (mapToSingleSubproject(updatedSubproject) == null) {
    return HttpStatus.BAD_REQUEST;
  }
  return HttpStatus.OK;
};

const deleteTrailerById = async (id: number): Promise<HttpStatus> => {
  const deletedTrailer = await database.trailer.delete({
    where: {
      id: id,
    },
  });
  if (mapToSingleTrailer(deletedTrailer) == null) {
    return HttpStatus.NOT_FOUND;
  }
  return HttpStatus.OK;
};

const removeAsset = async (
  trailerid: string,
  id: string,
): Promise<HttpStatus> => {

  const updatedTrailer = await database.trailer.update({
    where: {
      id: parseInt(trailerid),
    },
    data: {
      assets: {
        disconnect: {
          id: parseInt(id),
        },
      },
    },
  });
  if (mapToSingleTrailer(updatedTrailer) == null) {
    return HttpStatus.NOT_FOUND;
  }
  return HttpStatus.OK;
};

const addAsset = async (
  id: string,
  asset: Asset,
): Promise<HttpStatus | HttpException> => {
  const triller = await database.trailer.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      assets: true,
    },
  });
  if (mapToAssets(triller.assets).includes(asset)) {
    return new HttpException(
      'Asset already exists in this trailer',
      HttpStatus.BAD_REQUEST,
    );
  }

  const updatedTrailer = await database.trailer.update({
    where: {
      id: Number(id),
    },
    data: {
      assets: {
        connect: {
          id: asset.id,
        },
      },
    },
  });
  if (mapToSingleTrailer(updatedTrailer) == null) {
    return HttpStatus.NOT_FOUND;
  }
  return HttpStatus.OK;
};

export default {
  getAll,
  getById,
  update,
  getAllFromSubproject,
  deleteTrailerById,
  removeAsset,
  addAsset,
  addTrailer,
  getAllAssetsFromTrailer,
};
