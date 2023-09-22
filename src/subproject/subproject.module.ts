import { Module } from '@nestjs/common';
import { SubprojectService } from './subproject.service';
import { SubprojectController } from './subproject.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [SubprojectService,UserService],
  controllers: [SubprojectController],
})
export class SubprojectModule {}
