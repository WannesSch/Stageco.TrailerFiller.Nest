import { ProjectService } from './project.service';
import { Controller,Body, Get, Param, Post, Put, Delete,  Res, HttpStatus, HttpException } from '@nestjs/common';
import { Subproject } from 'src/subproject/subproject';
import { Project } from 'src/project/project';
import { error } from 'console';
@Controller('api/v1/project')
export class ProjectController {
    constructor(private projectService: ProjectService){}
    @Get('all')
        async getAllProjects(): Promise<Project[]> {
            return await this.projectService.getAllProjects();
        }
    @Get('/:id',)
        async getProjectById(@Param('id') id: string): Promise<Project> {
            const project = await this.projectService.getProjectById(id);
            if (typeof(project)==='undefined') {
                throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
            }
            return project;
        }
    @Delete('/:id')
        async deleteProject(@Param('id') id: string): Promise<void>{
            await this.projectService.deleteProject(id);
        }
    @Put('/update/:id')
        async updateProject(@Body() project: Project,@Param('id') id: string): Promise<void>{
            return await this.projectService.updateProject(id,project);
        }
    @Put('/addSubproject/:id')
        async addSubproject(@Body() subproject: Subproject,@Param('id') id: string): Promise<void>{
            return await this.projectService.addSubproject(id,subproject);
        }
    @Post('/add')
        async addProject(@Body() project: Project): Promise<void>{
            return await this.projectService.addProject(project);
        }

    
}
