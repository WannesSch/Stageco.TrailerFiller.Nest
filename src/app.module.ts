import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SubprojectModule } from './subproject/subproject.module';
import { AssetModule } from './asset/asset.module';
import { TrailerModule } from './trailer/trailer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ContentModule } from './content/content.module';
import { PositionService } from './position/position.service';
import { PositionModule } from './position/position.module';
import { RotationModule } from './rotation/rotation.module';
import { UserModule } from './user/user.module';
@Module({
  controllers: [AppController],
  providers: [AppService, PositionService],

  imports: [
    SubprojectModule,
    ProjectModule,
    AssetModule,
    TrailerModule,
    PrismaModule,
    ContentModule,
    PositionModule,
    RotationModule,
    UserModule,
  ],
})
export class AppModule {}
