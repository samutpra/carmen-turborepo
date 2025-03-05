import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() data: { email: string; password: string }) {
    return this.authService.createUser(data);
  }

  @Get('/login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data);
  }
}
