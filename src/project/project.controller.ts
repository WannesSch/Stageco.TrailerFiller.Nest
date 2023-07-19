import { ProjectService } from './project.service';
import { Controller,Body, Get, Param, Post, Put, Delete,  Res, HttpStatus, HttpException, HttpCode, UseFilters } from '@nestjs/common';
import { Subproject } from 'src/subproject/subproject';
import { Project } from 'src/project/project';
import { error } from 'console';
import {HttpExceptionFilter} from '../validation/http-exception';
@Controller('api/v1/project')
@UseFilters(HttpExceptionFilter)
export class ProjectController {
    constructor(private projectService: ProjectService){}
    @Get('/all')
        async getAllProjects(): Promise<Project[]> {
            return await this.projectService.getAllProjects();
        }
    @Get('/get/:id',)
        async getProjectById(@Param('id') id: string): Promise<Project | HttpStatus> {
            return await this.projectService.getProjectById(id);
        }
    @Delete('/delete/:id')
        async deleteProject(@Param('id') id: string): Promise<HttpStatus>{
            return await this.projectService.deleteProject(id);
        }
    @Put('/update/:id')
        async updateProject(@Body() project: Project,@Param('id') id: string): Promise<HttpStatus>{
            return await this.projectService.updateProject(id,project);
        }
        @Get('/allFromProject/:id')
        async getAllSubprojectsFromProject(@Param('id') id: string): Promise<Subproject[]> {
    return await this.projectService.getAllSubprojectsFromProject(id);
    }
    @Put('/addSubproject/:id')
        async addSubproject(@Body() subproject: Subproject,@Param('id') id: string): Promise<HttpStatus>{
            return await this.projectService.addSubproject(id,subproject);
        }
    @Post('/add')
        async addProject(@Body() project: Project): Promise<HttpStatus>{
               return await this.projectService.addProject(project);       
        }
            

    
}
