import { Module } from '@nestjs/common';
import { SubprojectService } from './subproject.service';
import { SubprojectController } from './subproject.controller';


@Module({
  providers: [SubprojectService],
  controllers: [SubprojectController]
})
export class SubprojectModule {}
