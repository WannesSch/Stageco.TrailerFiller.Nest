import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';
import { SubprojectModule } from './subproject/subproject.module';
import { AssetModule } from './asset/asset.module';
import { TrailerModule } from './trailer/trailer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ContentModule } from './content/content.module';
import { APP_PIPE } from '@nestjs/core';
import { FilesModule } from './files/files.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  
  imports: [SubprojectModule, ProjectModule, AssetModule, TrailerModule, PrismaModule, ContentModule, FilesModule],
})

export class AppModule {}
