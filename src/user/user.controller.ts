import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.usersService.findOne({ username });
  }
}
