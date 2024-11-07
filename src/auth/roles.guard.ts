import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    // 如果沒有定義角色，則允許所有請求
    if (!requiredRoles) {
      return true;
    }
    console.log(context.switchToHttp().getRequest());
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        'Access Denied: You do not have the required role.',
      );
    }

    return hasRole;
  }
}
