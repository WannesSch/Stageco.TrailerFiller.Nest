import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';
import { User } from 'src/user/user';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private userService:UserService) {}
  async matchRoles(roles: string[], user: User) {
    let match = false;
    //copilot please loop over roles and check if user.role is in roles
    for(let i = 0; i < roles.length; i++){
      if(user.role == roles[i]){
        match = true;
        break;
      }
    }
    return match
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      let name = payload['name'];
      let user = await this.userService.getUserByName(name);
      const isAuthorized = this.matchRoles(roles, user);
      return isAuthorized;
    } catch {
      throw new UnauthorizedException();
    }
  }
  
  private async extractTokenFromHeader(request: Request): Promise<string> | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}



