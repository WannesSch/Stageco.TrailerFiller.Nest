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
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';

@Module({
  controllers: [AppController],
  providers: [AppService, PositionService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  imports: [
    SubprojectModule,
    ProjectModule,
    AssetModule,
    TrailerModule,
    PrismaModule,
    ContentModule,
    PositionModule,
    RotationModule,
    AuthModule, 
    UserModule, 
  ],
})
export class AppModule {}
