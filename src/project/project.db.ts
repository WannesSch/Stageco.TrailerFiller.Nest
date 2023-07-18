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
    if(!id) throw new Error("No id provided");
    
    const project = await database.project.findUnique({
        where: {
            id: (id),
        },
        include: {
            Subprojects: true,
        },
    });
    if(project === null) return HttpStatus.NOT_FOUND;
    return (project);
};
const addProject = async (project: Project): Promise<HttpStatus> => {
    const newProject = await database.project.create({
        data: {
            id: project.id,
            title: project.title,
            description: project.description,
            venueAddress: project.venueAddress,
            crewChief: project.crewChief,
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

const addSubproject = async (id: string, subproject: Subproject): Promise<HttpStatus> => {
    const subProject = await database.subproject.create({
        data: {
            title: subproject.title,
            description: subproject.description,
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
          connect: {subprojectId: subProject.subprojectId}
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
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
    addSubproject,

};