import { mapToProjects,mapToSingleProject } from './project.mapper';
import database from '../prisma/database';
import { Project } from './project';
import { Subproject } from 'src/subproject/subproject';
import { HttpStatus } from '@nestjs/common';

const getAllProjects = async (): Promise<Project[]> => {
    const projects = await database.project.findMany({
        include: {
            Subprojects: false,
        },
    });
    return mapToProjects(projects);
};
const getProjectById = async (id: string): Promise<Project | HttpStatus>=> {
    if(id == null) return HttpStatus.BAD_REQUEST;
    
    const project = await database.project.findUnique({
        where: {
            id: (id),
        },
        include: {
            Subprojects: false,
        },
    });
    if(project === null) return HttpStatus.NOT_FOUND;
     let newProject = mapToSingleProject(project);
    return (newProject);
};
const addProject = async (project: Project): Promise<HttpStatus> => {
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
    if(mapToSingleProject(newProject)==null) return HttpStatus.BAD_REQUEST
    return HttpStatus.OK;
};

const updateProject = async (id: string, project: Project): Promise<HttpStatus> => {
    const updatedProject = await database.project.update({
        where: {
            id: (id),
        },
        data: {
            title: project.title,
            description: project.description,
            venueAddress: project.venueAddress,
            crewChief: project.crewChief,
        },
    });
    if(mapToSingleProject(updatedProject)==null) return HttpStatus.BAD_REQUEST
    return HttpStatus.OK;
};

const deleteProject = async (id: string): Promise<HttpStatus> => {
    const deletedProject = await database.project.delete({
        where: {
            id: (id),
        },
    });
    if(mapToSingleProject(deletedProject)==null) return HttpStatus.BAD_REQUEST
    return HttpStatus.OK;
};


export default {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,


};