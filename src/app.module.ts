import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { SubprojectModule } from './subproject/subproject.module';
import { AssetModule } from './asset/asset.module';
import { TrailerModule } from './trailer/trailer.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ContentModule } from './content/content.module';
import { FilesModule } from './files/files.module';
import { PositionService } from './position/position.service';
import { PositionModule } from './position/position.module';
import { RotationModule } from './rotation/rotation.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
@Module({
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard ,
  },AppService, PositionService, AuthService],

  imports: [
    SubprojectModule,
    ProjectModule,
    AssetModule,
    TrailerModule,
    PrismaModule,
    ContentModule,
    FilesModule,
    PositionModule,
    RotationModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
