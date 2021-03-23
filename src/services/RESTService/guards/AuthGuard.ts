import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      var token: string = request.get('authorization');
      var payload = JWT.verify(token, process.env.JWT_SECRET);
      if (!payload) throw new Error();
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
