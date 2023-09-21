import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';
import { User } from 'src/user/user';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles)
    if (!roles || roles.length === 0) {
      console.log("geenroles")
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Assuming you attach user to the request
    console.log(user)
    if (!user || !user.role) {
      // User or user's role is missing, deny access
      return false;
    }

    // Check if the user's role matches any of the specified roles
    return this.matchRoles(roles, user);
  }
  async matchRoles(roles: string[], user: User) {
    console.log(roles)
    console.log(user.role)
    let match = false;
    if (roles.indexOf(user.role) > -1) {
      match = true;
    }
  
    return match
  }
}

