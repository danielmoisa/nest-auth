import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }
}
