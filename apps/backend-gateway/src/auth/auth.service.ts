import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(loginDto: LoginDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/login`,
      loginDto,
      {
        params: { version },
      },
    );
  }

  async register(registerDto: RegisterDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/register`,
      registerDto,
      { params: { version } },
    );
  }

  async logout(logoutDto: LogoutDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/logout`,
      logoutDto,
      { params: { version } },
    );
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/refresh-token`,
      refreshTokenDto,
      { params: { version } },
    );
  }

  async verifyToken(verifyTokenDto: VerifyTokenDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/verify-token`,
      verifyTokenDto,
      { params: { version } },
    );
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/forgot-password`,
      forgotPasswordDto,
      { params: { version } },
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/reset-password`,
      resetPasswordDto,
      { params: { version } },
    );
  }

  async changePassword(changePasswordDto: ChangePasswordDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/change-password`,
      changePasswordDto,
      { params: { version } },
    );
  }

  async changeEmail(changeEmailDto: ChangeEmailDto, version: string) {
    return this.httpService.post(
      `${process.env.AUTH_SERVICE_URL}/change-email`,
      changeEmailDto,
      { params: { version } },
    );
  }
}
