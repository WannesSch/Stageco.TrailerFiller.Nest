import { Module } from '@nestjs/common';
import { PositionService } from './position.service';

@Module({
  providers: [PositionService],
  controllers: [],
})
export class PositionModule {}
