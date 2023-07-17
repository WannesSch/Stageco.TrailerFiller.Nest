import { Injectable } from '@nestjs/common';
import projectDB from './project.db';
import { Project } from './project';
import subprojectDb from 'src/subproject/subproject.db';
import { Subproject } from 'src/subproject/subproject';


@Injectable()
export class ProjectService {
    addProject(project: Project) {
            projectDB.addProject(project);
    
    }
    getProjectById(id: string) {
        return projectDB.getProjectById(id);
    }


    updateProject(id: string ,project: Project)  {
        projectDB.updateProject(id,project);
    }
    deleteProject(id: string) {
        projectDB.deleteProject(id);
    }
    // getSubprojectById(id: string) {
    //     projectDB.getSubprojectById(id);
    // }

    addSubproject(id: string, subproject: Subproject) {
        subprojectDb.addSubproject(subproject);
        projectDB.addSubproject(id,subproject);
    }


    getAllProjects = () => projectDB.getAllProjects();
    

}