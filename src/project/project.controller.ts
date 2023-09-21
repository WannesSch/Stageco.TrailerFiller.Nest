import { ProjectService } from './project.service';
import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  UseFilters,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Project } from 'src/project/project';
import { HttpExceptionFilter } from '../validation/http-exception';
import { AuthGuard } from '@nestjs/passport'; 
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';
@SetMetadata('roles', ['admin'])
@UseGuards(RolesGuard)

@Controller('api/v1/project')
@UseFilters(HttpExceptionFilter)
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  
  @Get('/all')
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects();
  }
  @Get('/get/:id')
  async getProjectById(@Param('id') id: string): Promise<Project | HttpStatus> {
    return await this.projectService.getProjectById(id);
  }
  @Delete('/delete/:id')
  async deleteProject(@Param('id') id: string): Promise<HttpStatus> {
    return await this.projectService.deleteProject(id);
  }
  @Put('/update/:id')
  async updateProject(
    @Body() project: Project,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return await this.projectService.updateProject(id, project);
  }

  @Post('/add')
  async addProject(@Body() project: Project): Promise<HttpStatus> {
    return await this.projectService.addProject(project);
  }
}
