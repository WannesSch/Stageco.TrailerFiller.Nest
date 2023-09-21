
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }
  async validate(name: string, password: string): Promise<any> {
    const user = await this.userService.authenticate({name, password});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
