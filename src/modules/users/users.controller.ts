import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  @Put("/:id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete()
  deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }
}
