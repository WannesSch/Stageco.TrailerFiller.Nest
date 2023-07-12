import { Module } from '@nestjs/common';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';

@Module({
  providers: [TrailerService],
  controllers: [TrailerController]
})
export class TrailerModule {}
