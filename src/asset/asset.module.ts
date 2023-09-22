import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [AssetService, UserService],
  controllers: [AssetController],
})
export class AssetModule {}
