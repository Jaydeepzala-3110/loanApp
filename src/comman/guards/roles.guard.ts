import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { authUser } = context.switchToHttp().getRequest();

    const roles = Object.values(
      this.reflector.get('roles', context.getHandler()),
    );

    if (!roles.length) return true;

    if (!roles.includes(authUser.role)) {
      return false;
    }

    return true;
  }
}
