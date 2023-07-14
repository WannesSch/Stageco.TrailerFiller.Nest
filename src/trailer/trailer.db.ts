import { mapToSingleTrailer,mapToTrailers } from './trailer.mapper';
import prisma from '../prisma/database';
import { Trailer } from './trailer';

const getAllTrailers = async (): Promise<Trailer[]> => {
    const trailers = await prisma.trailer.findMany();
    return mapToTrailers(trailers);
    }

    const addTrailer = async (trailer: Trailer): Promise<Trailer> => {
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


    export default {
        getAllTrailers,
        deleteTrailerById,
        addTrailer

    };
