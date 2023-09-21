import { mapToProjects, mapToSingleProject } from './project.mapper';
import database from '../prisma/database';
import { Project } from './project';
import { HttpStatus } from '@nestjs/common';

const getAllProjects = async (): Promise<Project[]> => {
  const projects = await database.project.findMany({
    include: {
      subprojects: false,
    },
  });
  return mapToProjects(projects);
};
const getProjectById = async (id: string): Promise<Project | HttpStatus> => {
  if (id == null) return HttpStatus.BAD_REQUEST;

  const project = await database.project.findUnique({
    where: {
      id: id,
    },
    include: {
      subprojects: false,
    },
  });
  if (project === null) return HttpStatus.NOT_FOUND;
  const newProject = mapToSingleProject(project);
  return newProject;
};
const addProject = async (project: Project): Promise<HttpStatus> => {
  if (project == null) return HttpStatus.BAD_REQUEST;
  const newProject = await database.project.create({
    data: {
      id: project.id,
      title: project.title,
      description: project.description,
      venueAddress: project.venueAddress,
      crewChief: project.crewChief,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    },
  });
  if (mapToSingleProject(newProject) == null) return HttpStatus.BAD_REQUEST;
  return HttpStatus.OK;
};

const updateProject = async (
  id: string,
  project: Project,
): Promise<HttpStatus> => {
  const time = new Date(Date.now());
  let offset = time.getTimezoneOffset();
  offset = Math.abs(offset / 60);
  time.setHours(time.getHours() + offset);
  const tijd = time.toISOString();
  const updatedProject = await database.project.update({
    where: {
      id: id,
    },
    data: {
      title: project.title,
      description: project.description,
      venueAddress: project.venueAddress,
      crewChief: project.crewChief,
      updatedAt: tijd,
    },
  });
  if (mapToSingleProject(updatedProject) == null) return HttpStatus.BAD_REQUEST;
  return HttpStatus.OK;
};

const deleteProject = async (id: string): Promise<HttpStatus> => {
  const deletedProject = await database.project.delete({
    where: {
      id: id,
    },
  });
  if (mapToSingleProject(deletedProject) == null) return HttpStatus.BAD_REQUEST;
  return HttpStatus.OK;
};

export default {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
