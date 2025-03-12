import { Controller, Logger, Post, Body, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private logger = new Logger(AuthController.name);

  @Post('login')
  async login(@Body() loginDto: any, @Query('version') version: string) {
    this.logger.log({
      file: AuthController.name,
      function: this.login.name,
      loginDto: loginDto,
      version: version,
    });
    return this.authService.login(loginDto, version);
  }

  @Post('register')
  async register(@Body() registerDto: any, @Query('version') version: string) {
    this.logger.log({
      file: AuthController.name,
      function: this.register.name,
      registerDto: registerDto,
      version: version,
    });
    return this.authService.register(registerDto, version);
  }

  @Post('logout')
  async logout(@Body() logoutDto: any, @Query('version') version: string) {
    this.logger.log({
      file: AuthController.name,
      function: this.logout.name,
      logoutDto: logoutDto,
      version: version,
    });
    return this.authService.logout(logoutDto, version);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: any,
    @Query('version') version: string,
  ) {
    this.logger.log({
      file: AuthController.name,
      function: this.refreshToken.name,
      refreshTokenDto: refreshTokenDto,
      version: version,
    });
    return this.authService.refreshToken(refreshTokenDto, version);
  }

  @Post('verify-token')
  async verifyToken(
    @Body() verifyTokenDto: any,
    @Query('version') version: string,
  ) {
    this.logger.log({
      file: AuthController.name,
      function: this.verifyToken.name,
      verifyTokenDto: verifyTokenDto,
      version: version,
    });
    return this.authService.verifyToken(verifyTokenDto, version);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: any,
    @Query('version') version: string,
  ) {
    this.logger.log({
      file: AuthController.name,
      function: this.forgotPassword.name,
      forgotPasswordDto: forgotPasswordDto,
      version: version,
    });
    return this.authService.forgotPassword(forgotPasswordDto, version);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: any,
    @Query('version') version: string,
  ) {
    this.logger.log({
      file: AuthController.name,
      function: this.resetPassword.name,
      resetPasswordDto: resetPasswordDto,
      version: version,
    });
    return this.authService.resetPassword(resetPasswordDto, version);
  }

  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: any,
    @Query('version') version: string,
  ) {
    this.logger.log({
      file: AuthController.name,
      function: this.changePassword.name,
      changePasswordDto: changePasswordDto,
      version: version,
    });
    return this.authService.changePassword(changePasswordDto, version);
  }

  @Post('change-email')
  async changeEmail(
    @Body() changeEmailDto: any,
    @Query('version') version: string,
  ) {
    this.logger.log({
      file: AuthController.name,
      function: this.changeEmail.name,
      changeEmailDto: changeEmailDto,
      version: version,
    });
    return this.authService.changeEmail(changeEmailDto, version);
  }
}
