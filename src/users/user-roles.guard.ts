// role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken'; // Install jwt library: npm install jwt
import { jwtConstants } from '../auth/constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const decoded = verify(token, jwtConstants.secret);
    const userRole = decoded['role']; // You need to implement a function to extract the role from the JWT

    return roles.includes(userRole);
  }
}
