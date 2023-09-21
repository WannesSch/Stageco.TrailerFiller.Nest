import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [], // Your other imports
  providers: [AuthService], // Include LocalStrategy here
  controllers: [], // Your controllers
})
export class AuthModule {}