import { Module } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [TrailerService,UserService],
  controllers: [TrailerController],
})
export class TrailerModule {}
