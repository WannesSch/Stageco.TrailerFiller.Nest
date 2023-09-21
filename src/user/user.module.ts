import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { LocalStrategy } from 'src/auth/local.auth';

@Module({
  imports: [AuthModule],
  providers: [UserService,LocalStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}