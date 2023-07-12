import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';
import { ProjectModule } from './project/project.module';
import { AssetModule } from './asset/asset.module';
import { TrailerModule } from './trailer/trailer.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ProjectModule, AssetModule, TrailerModule],
})

export class AppModule {}
