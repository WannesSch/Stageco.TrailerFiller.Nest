import { Module } from '@nestjs/common';
import { RotationService } from './rotation.service';

@Module({
  providers: [RotationService],
  controllers: [],
})
export class RotationModule {}
