import { Controller, Logger, Post, Body, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private logger = new Logger(AuthController.name);

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Query('version') version: string) {
    this.logger.log('ogin');
    return this.authService.login(loginDto, version);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Register');
    return this.authService.register(registerDto, version);
  }

  @Post('logout')
  async logout(
    @Body() logoutDto: LogoutDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Logout');
    return this.authService.logout(logoutDto, version);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Refresh Token');
    return this.authService.refreshToken(refreshTokenDto, version);
  }

  @Post('verify-token')
  async verifyToken(
    @Body() verifyTokenDto: VerifyTokenDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Verify Token');
    return this.authService.verifyToken(verifyTokenDto, version);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Forgot Password');
    return this.authService.forgotPassword(forgotPasswordDto, version);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Reset Password');
    return this.authService.resetPassword(resetPasswordDto, version);
  }

  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Change Password');
    return this.authService.changePassword(changePasswordDto, version);
  }

  @Post('change-email')
  async changeEmail(
    @Body() changeEmailDto: ChangeEmailDto,
    @Query('version') version: string,
  ) {
    this.logger.log('Change Email');
    return this.authService.changeEmail(changeEmailDto, version);
  }
}
