import { mapToSingleTrailer,mapToTrailers } from './trailer.mapper';
import prisma from '../prisma/database';
import { Trailer } from './trailer';
import { Asset } from '../asset/asset';

const getAll = async (): Promise<Trailer[]> => {
    const trailers = await prisma.trailer.findMany();
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


    const add = async (trailer: Trailer): Promise<Trailer> => {
        const newTrailer = await prisma.trailer.create({
        data: {
        height: trailer.height,
        width: trailer.width,
        depth: trailer.depth,
        weight: trailer.weight,
        maxWeight: trailer.maxWeight,
        },
        });
        return mapToSingleTrailer(newTrailer);
        }
    

const deleteTrailerById = async ({ id }: { id: number }) => {
    try {
      const findtrailer = await prisma.trailer.findFirst({
        where: {
          id: id,
        },
      });
      if (!findtrailer) throw new Error(`trailer with id: ${id} not found`);
      await prisma.trailer.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getById = async (id: string): Promise<Trailer> => {
    let idd = Number(id);
    const trailer = await prisma.trailer.findUnique({
      where: {
        id: idd,
      },
    });
    return mapToSingleTrailer(trailer);
  };
  const update = async (id: string, trailer: Trailer): Promise<Trailer> => {
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
    return mapToSingleTrailer(updatedTrailer);
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

  // const delete = async (id: string): Promise<void> => {
  //   let idd = Number(id);
  //   const deletedTrailer = await prisma.trailer.delete({
  //     where: {
  //       id: idd,
  //     },
  //   });
  //   return void 0;
  // };
  const addToSubproject = async (id: string, trailer: Trailer): Promise<Trailer> => {
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
    return mapToSingleTrailer(updatedTrailer);
  };

  const removeAsset = async (trailerid: string, id: string): Promise<Trailer> => {
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
    return mapToSingleTrailer(updatedTrailer);
  };


  const addAsset = async (id: string, asset: Asset): Promise<Trailer> => {
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
    return mapToSingleTrailer(updatedTrailer);
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
