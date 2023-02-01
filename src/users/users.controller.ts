import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }
}
