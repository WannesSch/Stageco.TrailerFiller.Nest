import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';
import { SubprojectModule } from './subproject/subproject.module';
import { AssetModule } from './asset/asset.module';
import { TrailerModule } from './trailer/trailer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [SubprojectModule, ProjectModule, AssetModule, TrailerModule, PrismaModule],
})

export class AppModule {}
