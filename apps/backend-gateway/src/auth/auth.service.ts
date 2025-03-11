import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { authAxios } from 'src/common/helpers/requests/axios.helper';
// import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private authAxios: AxiosInstance;
  constructor() {
    this.authAxios = authAxios();
  }

  async login(loginDto: any, version: string) {
    return await this.authAxios.post(`/login`, loginDto, {
      params: { version },
    });
  }

  async register(registerDto: any, version: string) {
    return await this.authAxios.post(`/register`, registerDto, {
      params: { version },
    });
  }

  async logout(logoutDto: any, version: string) {
    return await this.authAxios.post(`/logout`, logoutDto, {
      params: { version },
    });
  }

  async refreshToken(refreshTokenDto: any, version: string) {
    return await this.authAxios.post(`/refresh-token`, refreshTokenDto, {
      params: { version },
    });
  }

  async verifyToken(verifyTokenDto: any, version: string) {
    return await this.authAxios.post(`/verify-token`, verifyTokenDto, {
      params: { version },
    });
  }

  async forgotPassword(forgotPasswordDto: any, version: string) {
    return await this.authAxios.post(`/forgot-password`, forgotPasswordDto, {
      params: { version },
    });
  }

  async resetPassword(resetPasswordDto: any, version: string) {
    return await this.authAxios.post(`/reset-password`, resetPasswordDto, {
      params: { version },
    });
  }

  async changePassword(changePasswordDto: any, version: string) {
    return await this.authAxios.post(`/change-password`, changePasswordDto, {
      params: { version },
    });
  }

  async changeEmail(changeEmailDto: any, version: string) {
    return await this.authAxios.post(`/change-email`, changeEmailDto, {
      params: { version },
    });
  }
}
