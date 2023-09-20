import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/user/user';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService,  ) {
        
    }
    authenticate(payload: JwtPayload): Promise<User> {
        return this.userService.getUserByName(payload.name);
    }
}
