import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [], // Your other imports
  providers: [AuthService,JwtService,UserService], // Include LocalStrategy here
  controllers: [], // Your controllers
})
export class AuthModule {}