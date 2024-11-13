import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  AuthLoginDto,
  AuthLoginResponseDto,
} from '@carmensoftware/shared-dtos';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.guard';
import {
  UserForgotPassDto,
  UserRegisterDto,
  UserRegisterEmailDto,
} from './auth.dto';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req): AuthLoginResponseDto {
    return req.user;
  }

  @Get('status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  status(@Request() req): AuthLoginResponseDto {
    return req.user;
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Post('register/sendemail')
  async register(
    @Body() userRegisterEmailDto: UserRegisterEmailDto,
    @Request() req,
  ) {
    return this.authService.registerEmail(userRegisterEmailDto, req);
  }

  @Post('register/confirm')
  async confirm(@Body() userRegisterDto: UserRegisterDto, @Request() req) {
    return this.authService.registerConfirm(userRegisterDto, req);
  }

  @Post('forgotpassword/sendemail')
  async forgot(@Body() userForgotPassDto: UserForgotPassDto, @Request() req) {
    return this.authService.forgotPasswordEmail(userForgotPassDto, req);
  }

  @Post('forgotpassword/confirm')
  async forgotConfirm(
    @Body() userRegisterDto: UserRegisterDto,
    @Request() req,
  ) {
    return this.authService.forgotPasswordConfirm(userRegisterDto, req);
  }
}
