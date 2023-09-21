import { Module } from "@nestjs/common"
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from "src/user/user.service";
import { User } from "../user/user";
import { LocalStrategy } from "./local.auth";


@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '8h' },
    }), PassportModule.register({ defaultStrategy: 'local' })],
    providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }