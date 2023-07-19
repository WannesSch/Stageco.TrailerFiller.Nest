import subprojectMapper, { mapToSingleSubproject,mapToSubprojects } from './subproject.mapper';
import database from '../prisma/database';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';
import { HttpStatus } from '@nestjs/common';
import { mapToAssets } from 'src/asset/asset.mapper';
import { Asset } from 'src/asset/asset';
import * as fs from 'fs';
import { Content } from 'src/content/content';
import { mapToTrailers } from 'src/trailer/trailer.mapper';
import { csvHelper } from './subproject.helper';
import { mapToSingleProject } from 'src/project/project.mapper';

const getSubprojectById = async (id: string): Promise<Subproject> => {
    const subproject = await database.subproject.findUnique({
        where: {
        id: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToSingleSubproject(subproject);
    }
    const deleteSubproject = async (id: string): Promise<HttpStatus> => {
        const deletedSubproject = await database.subproject.delete({
        where: {
        id: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    if(mapToSingleSubproject(deletedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
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
    

    const updateSubproject = async (id: string,subproject: Subproject): Promise<HttpStatus> => {
        const updatedSubproject = await database.subproject.update({
        where: {
        id: parseInt(id),
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
     if(mapToSingleSubproject(updatedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
    }

    const getAllSubprojectsFromProject = async (id: string): Promise<Subproject[]> => {
        const subprojects = await database.subproject.findMany({
        where: {
        projectId: (id),
        },
        include: {
        Trailers: false,
        Assets: false,
        },
    });
    return mapToSubprojects(subprojects);
    }

    const getAllAssetsFromSubproject = async (id: string): Promise<Asset[]> => {
        const subproject = await database.subproject.findUnique({
        where: {
        id: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToAssets(subproject.Assets);
    }
    const getAllTrailersFromSubproject = async (id: string): Promise<Trailer[]> => {
        const subproject = await database.subproject.findUnique({
        where: {
        id: parseInt(id),
        },
        include: {
        Trailers: true,
        Assets: true,
        },
    });
    return mapToTrailers(subproject.Trailers);
    }

    

    const addAssets = async (id: string, assets): Promise<HttpStatus> => {
        const updatedSubproject = await database.subproject.update({
        where: {
        id: parseInt(id),
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
     if(mapToSingleSubproject(updatedSubproject)==null){
        return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.OK;
    }

    const csvReader = async (filename: string,id:string): Promise<Asset[]|HttpStatus> => {
      const response = csvHelper(filename,id);
      return response;
      }

      const addSubproject = async (id: string, subproject: Subproject): Promise<HttpStatus> => {
        const subProject = await database.subproject.create({
            data: {
                title: subproject.title,
                description: subproject.description,
                departureDate: subproject.departureDate,
                createdAt: subproject.createdAt,
                crewChief: subproject.crewChief,
                updatedAt: subproject.updatedAt,
                project: {
                    connect: {id: (id)},
                },
            },
        });
        
        const updatedProject = await database.project.update({
          where: {
            id: (id),
          },
          data: {
            Subprojects: {
              connect: {id: subProject.id}
            },
          },
          include: {
            Subprojects: true,
          },
        });
        if(mapToSingleProject(updatedProject)==null) return HttpStatus.BAD_REQUEST
        return HttpStatus.OK;
    }

    

    
    export default {
        getSubprojectById,
        getSubprojects,
        addSubproject,
        updateSubproject,

        deleteSubproject,
        addAssets,
        getAllAssetsFromSubproject,
        getAllSubprojectsFromProject,
        csvReader,
        getAllTrailersFromSubproject,

    };
