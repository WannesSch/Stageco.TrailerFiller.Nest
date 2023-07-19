import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SubprojectModule } from './subproject/subproject.module';
import { AssetModule } from './asset/asset.module';
import { TrailerModule } from './trailer/trailer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ContentModule } from './content/content.module';
import { FilesModule } from './files/files.module';
@Module({
  controllers: [AppController],
  providers: [AppService],

  imports: [
    SubprojectModule,
    ProjectModule,
    AssetModule,
    TrailerModule,
    PrismaModule,
    ContentModule,
    FilesModule,
  ],
})
export class AppModule {}
