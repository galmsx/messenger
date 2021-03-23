import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from '../auth.constants';
import { AuthService } from '../auth.service';
import { UserModule } from '../../UserService/IoC/user.module';

@Module({
  imports: [UserModule],
  providers: [{ provide: AUTH_SERVICE, useClass: AuthService }],
  exports: [AUTH_SERVICE],
})
export class AuthModule {}
