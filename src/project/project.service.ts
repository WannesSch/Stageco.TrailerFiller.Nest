import { HttpStatus, Injectable } from '@nestjs/common';
import projectDB from './project.db';
import { Project } from './project';

@Injectable()
export class ProjectService {
  addProject(project: Project): Promise<HttpStatus> {
    return projectDB.addProject(project);
  }
  getProjectById(id: string): Promise<Project | HttpStatus> {
    return projectDB.getProjectById(id);
  }

  updateProject(id: string, project: Project): Promise<HttpStatus> {
    return projectDB.updateProject(id, project);
  }
  deleteProject(id: string): Promise<HttpStatus> {
    return projectDB.deleteProject(id);
  }
  getAllProjects() {
    return projectDB.getAllProjects();
  }
}
