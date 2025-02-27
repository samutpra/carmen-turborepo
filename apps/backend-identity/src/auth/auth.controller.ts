import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './auth.service';

@Controller('api/v1/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() data: { email: string; password: string }) {
    return this.userService.createUser(data);
  }

  @Get('/login')
  async login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data);
  }
}
