import {
  AuthLoginResponseDto,
  EmailDto,
  UserForgotPassDto,
  UserRegisterDto,
} from '@carmensoftware/shared-dtos';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.guard';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);
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
    this.logger.debug({ token: token });
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
    this.logger.debug({ userRegisterEmailDto: userRegisterEmailDto });
    return this.authService.registerEmail(userRegisterEmailDto, req);
  }

  @Post('register/confirm')
  @ApiTags('register')
  @ApiBody({
    type: UserRegisterDto,
    description: 'UserRegisterDto',
  })
  async register_confirm(@Body() userRegisterDto: any, @Request() req) {
    this.logger.debug({ userRegisterDto: userRegisterDto });
    return this.authService.registerConfirm(userRegisterDto, req);
  }

  @Post('forgotpassword/email-token')
  @ApiTags('forgotpassword')
  @ApiBody({
    type: EmailDto,
    description: 'UserForgotPasswordEmailDto',
  })
  async forgot_email_token(
    @Body() userForgotPasswordEmailDto: any,
    @Request() req,
  ) {
    this.logger.debug({
      userForgotPasswordEmailDto: userForgotPasswordEmailDto,
    });
    return this.authService.forgotPasswordEmail(
      userForgotPasswordEmailDto,
      req,
    );
  }

  @Post('forgotpassword/confirm')
  @ApiTags('forgotpassword')
  @ApiBody({
    type: UserForgotPassDto,
    description: 'UserForgotPassDto',
  })
  async forgot_confirm(@Body() userForgotPassDto: any, @Request() req) {
    this.logger.debug({ userForgotPassDto: userForgotPassDto });
    return this.authService.forgotPasswordConfirm(userForgotPassDto, req);
  }
}
