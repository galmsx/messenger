import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { IUserExtendedInfo } from '../../UserService/user.interfaces';

export const User = createParamDecorator((_, ctx: ExecutionContext) : IUserExtendedInfo => {
  const req = ctx.switchToHttp().getRequest();
  const token: string = req.get('authorization');
  return JWT.verify(token, process.env.JWT_SECRET);
});
