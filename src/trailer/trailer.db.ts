import { mapToSingleTrailer,mapToTrailers } from './trailer.mapper';
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
    }


    const getAllAssetsFromTrailer = async (id: string): Promise<Asset[]> => {
        let idd = Number(id);
      const assets = await database.asset.findMany({
          where: {
            trailerId: idd,
          },
          include: {
            content: false,
            position: true,
            rotation: true,

          },
        });
        return mapToAssets(assets);
      };


const deleteTrailerById = async ({ id }: { id: number }):Promise<HttpStatus> => {
    
      const findtrailer = await database.trailer.findFirst({
        where: {
          id: id,
        },
      });
      if (!findtrailer)(HttpStatus.NOT_FOUND);
      await database.trailer.delete({
        where: {
          id: id,
        },
      });

      return HttpStatus.OK;
      
  };
  const getById = async (id: string): Promise<Trailer> => {
    let idd = Number(id);
    const trailer = await database.trailer.findUnique({
      where: {
        id: idd,

      },
      include: {
        assets: true,
      },
    });
    return mapToSingleTrailer(trailer);
  };
  const update = async (id: string, trailer: Trailer): Promise<HttpStatus> => {
    let idd = Number(id);
    const updatedTrailer = await database.trailer.update({
      where: {
        id: idd,
      },
      data: {
        height: trailer.height,
        width: trailer.width,
        depth: trailer.depth,
        weight: trailer.weight,
        maxWeight: trailer.maxWeight,
      },
    });
     if(mapToSingleTrailer(updatedTrailer)==null){
         return HttpStatus.NOT_FOUND;
     }
    return HttpStatus.OK;
  };
  const getAllFromSubproject = async (id: string): Promise<Trailer[]> => {
    let idd = Number(id);
    const trailer = await database.trailer.findMany({
      where: {
        subprojectId: idd,
      },
    });
    return mapToTrailers(trailer);
  };
  
  const addTrailer = async (id: string, trailer: Trailer): Promise<HttpStatus> => {

    const newTrailer = await database.trailer.create({
      data: {
        height: trailer.height,
        width: trailer.width,
        depth: trailer.depth,
        maxWeight: trailer.maxWeight,
        subprojectId: parseInt(id),
      },
    });
    const updatedSubproject = await database.subproject.update({
      where: {
        id: parseInt(id),
      },
      data: {
        trailers: {
          connect: {id: newTrailer.id}
        },
      },
      include: {
        trailers: true,
        assets: true,
      },
    });
    if(mapToSingleSubproject(updatedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;

}

  const removeAsset = async (trailerid: string, id: string): Promise<HttpStatus>=> {
    let idd = Number(trailerid);
    let iddd = Number(id);
    const updatedTrailer = await database.trailer.update({
      where: {
        id: idd,
      },
      data: {
        assets: {
          disconnect: {
            id: iddd,
          },
        },
      },
    });
     if(mapToSingleTrailer(updatedTrailer)==null){
         return HttpStatus.NOT_FOUND;
     }
    return HttpStatus.OK;
  };


  const addAsset = async (id: string, asset: Asset): Promise<HttpStatus | HttpException> => {
    let triller = await database.trailer.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        assets: true,
      },
    });
    if(mapToAssets(triller.assets).includes(asset)){
        return new HttpException('Asset already exists in this trailer', HttpStatus.BAD_REQUEST);
    }

    let idd = Number(id);
    const updatedTrailer = await database.trailer.update({
      where: {
        id: idd,
      },
      data: {
        assets: {
          connect: {
            id: asset.id,
          },
        },
      },
    });
     if(mapToSingleTrailer(updatedTrailer)==null){
         return HttpStatus.NOT_FOUND;
     }
    return HttpStatus.OK;
  };



    export default {
      getAll,
        deleteTrailerById,
        getById,
        update,
        getAllFromSubproject,
        removeAsset, 
        addAsset,
        addTrailer,
        getAllAssetsFromTrailer,


    };
