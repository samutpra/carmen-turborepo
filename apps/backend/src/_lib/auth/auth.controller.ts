import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
  EmailDto,
} from '@carmensoftware/shared-dtos';

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
  status(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Get('check-token')
  async checkToken(@Query('token') token: string, @Request() req) {
    return this.authService.checkToken(token, req);
  }

  @Post('register/email-token')
  @ApiTags('register')
  @ApiBody({
    type: EmailDto,
    description: 'UserRegisterEmailDto',
  })
  async register_email_token(
    @Body() userRegisterEmailDto: any,
    @Request() req,
  ) {
    console.log(userRegisterEmailDto);
    return this.authService.registerEmail(userRegisterEmailDto, req);
  }

  @Post('register/confirm')
  @ApiTags('register')
  @ApiBody({
    type: UserRegisterDto,
    description: 'UserRegisterDto',
  })
  async register_confirm(@Body() userRegisterDto: any, @Request() req) {
    return this.authService.registerConfirm(userRegisterDto, req);
  }

  @Post('forgotpassword/email-token')
  @ApiTags('forgotpassword')
  @ApiBody({
    type: EmailDto,
  })
  async forgot_email_token(
    @Body() userForgotPassDto: UserForgotPassDto,
    @Request() req,
  ) {
    return this.authService.forgotPasswordEmail(userForgotPassDto, req);
  }

  @Post('forgotpassword/confirm')
  @ApiTags('forgotpassword')
  @ApiBody({
    type: UserForgotPassDto,
    description: 'UserForgotPassDto',
  })
  async forgot_confirm(@Body() userForgotPassDto: any, @Request() req) {
    return this.authService.forgotPasswordConfirm(userForgotPassDto, req);
  }
}
