import { mapToSingleTrailer,mapToTrailers } from './trailer.mapper';
import prisma from '../prisma/database';
import { Trailer } from './trailer';
import { Asset } from '../asset/asset';
import { HttpStatus } from '@nestjs/common';

const getAll = async (): Promise<Trailer[]> => {
    const trailers = await prisma.trailer.findMany({
        include: {
            Assets: true,
            },
            });
    return mapToTrailers(trailers);
    }


    const getAllAssetsFromTrailer = async (id: string): Promise<Asset[]> => {
        let idd = Number(id);
      const trailer = await prisma.trailer.findUnique({
          where: {
            id: idd,
          },
          include: {
            Assets: true,
          },
        });
        return mapToSingleTrailer(trailer).Assets;
      };


    const add = async (trailer : Trailer): Promise<HttpStatus> => {
        const newTrailer = await prisma.trailer.create({
        data: {
        height: trailer.height,
        width: trailer.width,
        depth: trailer.depth,
        maxWeight: trailer.maxWeight,
        },
        });
         if(mapToSingleTrailer(newTrailer)==null){
             return HttpStatus.BAD_REQUEST;
         }
        return HttpStatus.CREATED;
        
    };

const deleteTrailerById = async ({ id }: { id: number }):Promise<HttpStatus> => {
    
      const findtrailer = await prisma.trailer.findFirst({
        where: {
          id: id,
        },
      });
      if (!findtrailer)(HttpStatus.NOT_FOUND);
      await prisma.trailer.delete({
        where: {
          id: id,
        },
      });

      return HttpStatus.OK;
      
  };
  const getById = async (id: string): Promise<Trailer> => {
    let idd = Number(id);
    const trailer = await prisma.trailer.findUnique({
      where: {
        id: idd,

      },
      include: {
        Assets: true,
      },
    });
    return mapToSingleTrailer(trailer);
  };
  const update = async (id: string, trailer: Trailer): Promise<HttpStatus> => {
    let idd = Number(id);
    const updatedTrailer = await prisma.trailer.update({
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
    const trailer = await prisma.trailer.findMany({
      where: {
        subprojectId: idd,
      },
    });
    return mapToTrailers(trailer);
  };
  const addToSubproject = async (id: string, trailer: Trailer): Promise<HttpStatus> => {
    let idd = Number(id);
    const updatedTrailer = await prisma.trailer.update({
      where: {
        id: trailer.trailerId,
      },
      data: {
        height: trailer.height,
        width: trailer.width,
        depth: trailer.depth,
        weight: trailer.weight,
        maxWeight: trailer.maxWeight,
        subprojectId: idd,
      },
    });
     if(mapToSingleTrailer(updatedTrailer)==null){
         return HttpStatus.NOT_FOUND;
     }
    return HttpStatus.OK;
  };

  const removeAsset = async (trailerid: string, id: string): Promise<HttpStatus>=> {
    let idd = Number(trailerid);
    let iddd = Number(id);
    const updatedTrailer = await prisma.trailer.update({
      where: {
        id: idd,
      },
      data: {
        Assets: {
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


  const addAsset = async (id: string, asset: Asset): Promise<HttpStatus> => {
    let idd = Number(id);
    const updatedTrailer = await prisma.trailer.update({
      where: {
        id: idd,
      },
      data: {
        Assets: {
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
        addToSubproject,
        removeAsset, 
        addAsset,
        add,
        getAllAssetsFromTrailer,


    };
