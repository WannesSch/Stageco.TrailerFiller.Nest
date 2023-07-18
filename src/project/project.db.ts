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
            id: Number(id),
        },
        include: {
            Subprojects: true,
        },
    });
    if(project === null) return HttpStatus.NOT_FOUND;
    return (project);
};
const addProject = async (project: Project): Promise<Project> => {
    try{

    const newProject = await database.project.create({
        data: {
            title: project.title,
            description: project.description,
            venueAddress: project.venueAddress,
            crewChief: project.crewChief,
        },
    });
    return mapToSingleProject(newProject);
} catch(error){
    throw new Error("Project not added");
} 
};

const updateProject = async (id: string, project: Project): Promise<Project> => {
    const updatedProject = await database.project.update({
        where: {
            id: Number(id),
        },
        data: {
            title: project.title,
            description: project.description,
            venueAddress: project.venueAddress,
            crewChief: project.crewChief,
        },
    });
    return mapToSingleProject(updatedProject);
};

const deleteProject = async (id: string): Promise<Project> => {
    if(!id) throw new Error("No id provided");
    const deletedProject = await database.project.delete({
        where: {
            id: Number(id),
        },
    });
    return mapToSingleProject(deletedProject);
};

const addSubproject = async (id: string, subproject: Subproject): Promise<Project> => {
    const updatedProject = await database.project.update({
      where: {
        id: parseInt(id),
      },
      data: {
        Subprojects: {
          connect: {subprojectId: subproject.subprojectId}
        },
      },
      include: {
        Subprojects: true,
      },
    });
    return mapToSingleProject(updatedProject);
}


export default {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
    addSubproject,

};