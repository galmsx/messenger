import { Controller, Get, Inject, Query, Res } from '@nestjs/common';
import { IJwtData } from '../../../AuthService/auth.interfaces';
import { AUTH_SERVICE } from '../../../AuthService/auth.constants';
import { AuthService } from '../../../AuthService/auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {}

  @Get('/google')
  public async redirectToKeyGeneration(@Query('code') code, @Res() res): Promise<void> {
    if (!code) res.redirect('/');
    res.redirect(`/#/generate_key/?code=${code}`);
  }

  @Get('/google/login')
  public async loginByGoogle(@Query('code') code: string, @Query('key') key: string): Promise<IJwtData> {
    const googleAuthCode = decodeURIComponent(code);
    return this.authService.loginByGoogle(googleAuthCode, key);
  }
}
