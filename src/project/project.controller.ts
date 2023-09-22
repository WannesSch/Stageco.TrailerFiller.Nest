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
import endpoint from 'src/endpoint.roles';

@UseGuards(RolesGuard)
@Controller('api/v1/project')
@UseFilters(HttpExceptionFilter)
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @SetMetadata('roles', endpoint.allProject)
  @Get('/all')
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects();
  }
  @SetMetadata('roles', endpoint.getProject)
  @Get('/get/:id')
  async getProjectById(@Param('id') id: string): Promise<Project | HttpStatus> {
    return await this.projectService.getProjectById(id);
  }
  @SetMetadata('roles', endpoint.delProject)
  @Delete('/delete/:id')
  async deleteProject(@Param('id') id: string): Promise<HttpStatus> {
    return await this.projectService.deleteProject(id);
  }
  @SetMetadata('roles', endpoint.updateProject)
  @Put('/update/:id')
  async updateProject(
    @Body() project: Project,
    @Param('id') id: string,
  ): Promise<HttpStatus> {
    return await this.projectService.updateProject(id, project);
  }
  @SetMetadata('roles', endpoint.addProject)
  @Post('/add')
  async addProject(@Body() project: Project): Promise<HttpStatus> {
    return await this.projectService.addProject(project);
  }
}
