import { mapToSingleSubproject,mapToSubprojects } from './subproject.mapper';
import database from '../prisma/database';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';

const getSubprojectById = async (id: string): Promise<Subproject> => {
    const subproject = await database.subproject.findUnique({
        where: {
        subprojectId: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSingleSubproject(subproject);
    }
    const deleteSubproject = async (id: string): Promise<void> => {
        const deletedSubproject = await database.subproject.delete({
        where: {
        subprojectId: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    }
    const getSubprojects = async (): Promise<Subproject[]> => {
        const subprojects = await database.subproject.findMany({
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSubprojects(subprojects);
    }
    const addSubproject = async (subproject: Subproject): Promise<Subproject> => {
        const newSubproject = await database.subproject.create({
        data: {
        title: subproject.title,
        description: subproject.description,
        },
        include: {
        Trailers: false,
        Assets: false,
        },
    });
    return mapToSingleSubproject(newSubproject);
    }
    const updateSubproject = async (id: string,subproject: Subproject): Promise<Subproject> => {
        const updatedSubproject = await database.subproject.update({
        where: {
        subprojectId: parseInt(id),
        },
        data: {
        title: subproject.title,
        description: subproject.description,
        departureDate: subproject.departureDate,
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSingleSubproject(updatedSubproject);
    }
    
//     const addTrailer = async (id: string, trailer: Trailer): Promise<Subproject> => {
//         const updatedSubproject = await database.subproject.update({
//         where: {
//         subprojectId: parseInt(id),
//         },
//         data: {
//         Trailers: {
//         create: trailer,
//         },
//         },
//         include: {
//         Trailers: true,
//         Assets: true,
//         },
//     });
//     return mapToSingleSubproject(updatedSubproject);
// }
const addTrailer = async (id: string, trailer: Trailer): Promise<Subproject> => {
    const updatedSubproject = await database.subproject.update({
      where: {
        subprojectId: parseInt(id),
      },
      data: {
        Trailers: {
          connect: {id: trailer.trailerId}
        },
      },
      include: {
        Trailers: true,
        Assets: true,
      },
    });
    return mapToSingleSubproject(updatedSubproject);
}

    const addAssets = async (id: string, assets): Promise<Subproject> => {
        const updatedSubproject = await database.subproject.update({
        where: {
        subprojectId: parseInt(id),
        },
        data: {
        Assets: {
        create: assets,
        },
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSingleSubproject(updatedSubproject);
    }

    
    export default {
        getSubprojectById,
        getSubprojects,
        addSubproject,
        updateSubproject,
        addTrailer,
        deleteSubproject,
        addAssets,
    };
