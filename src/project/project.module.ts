import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ProjectService, UserService],
  controllers: [ProjectController],
})
export class ProjectModule {}
