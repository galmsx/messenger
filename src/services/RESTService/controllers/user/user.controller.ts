import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard';
import { USER_SERVICE } from '../../../UserService/usser.constants';
import { UserService } from '../../../UserService/user.service';
import { IUserExtendedInfo } from '../../../UserService/user.interfaces';

@Controller('/api/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {}

  @Get('/:id')
  public async getUser(@Param('id') id: number): Promise<IUserExtendedInfo> {
    return this.userService.getUserExtendedInfo({ id });
  }
  @Get()
  public async searchUsers(@Query('search') search: string): Promise<IUserExtendedInfo[]> {
    return this.userService.findUsers(search);
  }
}
