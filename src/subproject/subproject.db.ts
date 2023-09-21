import { mapToSingleSubproject, mapToSubprojects } from './subproject.mapper';
import database from '../prisma/database';
import { Subproject } from './subproject';
import { Trailer } from 'src/trailer/trailer';
import { HttpStatus } from '@nestjs/common';
import { Asset } from 'src/asset/asset';
import { mapToTrailers } from 'src/trailer/trailer.mapper';
import { csvHelper } from './subproject.helper';
import { mapToSingleProject } from 'src/project/project.mapper';
import * as fs from 'fs';
import * as path from 'path';
const deleteAsset = async (
  id: string,
  assetId: string,
): Promise<HttpStatus> => {
  const updatedSubproject = await database.subproject.update({
    where: {
      id: parseInt(id),
    },
    data: {
      assets: {
        delete: { id: parseInt(assetId) },
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

const getSubprojectById = async (id: string): Promise<Subproject> => {
  const subproject = await database.subproject.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      trailers: true,
      assets: true,
    },
  });
  return mapToSingleSubproject(subproject);
};
const deleteSubproject = async (id: string): Promise<HttpStatus> => {
  const deletedSubproject = await database.subproject.delete({
    where: {
      id: parseInt(id),
    },
    include: {
      trailers: true,
      assets: true,
    },
  });
  if (mapToSingleSubproject(deletedSubproject) == null) {
    return HttpStatus.BAD_REQUEST;
  }
  return HttpStatus.OK;
};
const getSubprojects = async (): Promise<Subproject[]> => {
  const subprojects = await database.subproject.findMany({
    include: {
      trailers: true,
      assets: true,
    },
  });
  return mapToSubprojects(subprojects);
};

const updateSubproject = async (
  id: string,
  subproject: Subproject,
): Promise<HttpStatus> => {
  const time = new Date(Date.now());
  let offset = time.getTimezoneOffset();
  offset = Math.abs(offset / 60);
  time.setHours(time.getHours() + offset);
  const tijd = time.toISOString();
  const updatedSubproject = await database.subproject.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: subproject.title,
      description: subproject.description,
      departureDate: subproject.departureDate,
      crewChief: subproject.crewChief,
      updatedAt: tijd,
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

const getAllSubprojectsFromProject = async (
  id: string,
): Promise<Subproject[]> => {
  const subprojects = await database.subproject.findMany({
    where: {
      projectId: id,
    },
    include: {
      trailers: false,
      assets: false,
    },
  });
  return mapToSubprojects(subprojects);
};

const getAllAssetsFromSubproject = async (id: string): Promise<Asset[]> => {
  const assets = await database.asset.findMany({
    where: {
      subprojectId: parseInt(id),
    },
    include: {
      content: true,
      position: true,
      rotation: true,
    },
  });
  return assets;
};

const getAllTrailersFromSubproject = async (id: string): Promise<Trailer[]> => {
  const subproject = await database.subproject.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      trailers: true,
      assets: true,
    },
  });
  return mapToTrailers(subproject.trailers);
};

const addAssets = async (id: string, assets): Promise<HttpStatus> => {
  const updatedSubproject = await database.subproject.update({
    where: {
      id: parseInt(id),
    },
    data: {
      assets: {
        create: assets,
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

const csvReader = async (
  filename: string,
  id: string,
): Promise<HttpStatus> => {
  return csvHelper(filename, id);
};

const addSubproject = async (
  id: string,
  subproject: Subproject,
): Promise<HttpStatus> => {
  const subProject = await database.subproject.create({
    data: {
      title: subproject.title,
      description: subproject.description,
      departureDate: subproject.departureDate,
      createdAt: subproject.createdAt,
      crewChief: subproject.crewChief,
      updatedAt: subproject.updatedAt,
      project: {
        connect: { id: id },
      },
    },
  });

  const updatedProject = await database.project.update({
    where: {
      id: id,
    },
    data: {
      subprojects: {
        connect: { id: subProject.id },
      },
    },
    include: {
      subprojects: true,
    },
  });
  if (mapToSingleProject(updatedProject) == null) return HttpStatus.BAD_REQUEST;
  return HttpStatus.OK;
};

const uploadFile = async (
  id: string,
  file: Express.Multer.File,
): Promise<HttpStatus> => {
  const subproject = await database.subproject.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const destination = './uploads';
  const dateTime = new Date();
  const datum = dateTime.toISOString().slice(0, 10);
  const filename =
    file.originalname +
    '-' +
    subproject.title +
    '-' +
    datum +
    '-' +
    (Math.random() + 1).toString(36).substring(7);
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  try {
    fs.writeFileSync(path.join(destination, filename), file.buffer);
  } catch (error) {
    console.error(`Error saving file ${file.originalname}:`, error);
  }
  return await csvReader(destination + '/' + filename, id);
  
};

export default {
  getSubprojectById,
  getSubprojects,
  addSubproject,
  updateSubproject,
  deleteAsset,
  deleteSubproject,
  addAssets,
  getAllAssetsFromSubproject,
  getAllSubprojectsFromProject,
  csvReader,
  getAllTrailersFromSubproject,
  uploadFile,
};
