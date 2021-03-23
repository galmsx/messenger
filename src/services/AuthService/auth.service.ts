import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IJwtData } from './auth.interfaces';
import * as fetch from 'node-fetch';
import { USER_SERVICE } from '../UserService/usser.constants';
import { UserService } from '../UserService/user.service';
import * as JWT from 'jsonwebtoken';
import { IUserExtendedInfo } from '../UserService/user.interfaces';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {}

  public async loginByGoogle(code: string, key: string): Promise<IJwtData> {
    const googleAccessToken: string = await this.getGoogleAccessToken(code);
    const email: string = await this.getUserEmail(googleAccessToken);
    const user = await this.userService.getUserExtendedInfo({ email });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const token: string = this.generateToken(user);
    await this.userService.updateUserInfo(user.id, { public_key: key });

    return { token };
  }

  private generateToken(user: IUserExtendedInfo): string {
    return JWT.sign(
      {
        ...user,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
  }

  private async getGoogleAccessToken(code: string): Promise<string> {
    const res = await fetch('https://accounts.google.com/o/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${
        process.env.GOOGLE_CLIENT_SECRET
      }&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
    }).then(r => r.json());
    return res.access_token;
  }

  private async getUserEmail(accessToken): Promise<string> {
    const userInfo = await (await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    )).json();
    return userInfo.email;
  }
}
