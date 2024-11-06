import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthLoginDto, AuthLoginResponseDto } from '@shared/dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt.guard';

@Controller('api/v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: AuthLoginDto,
    examples: {
      example1: {
        value: {
          username: 'test1',
          password: 'password1',
        },
      },
      example2: {
        value: {
          username: 'test2',
          password: 'password2',
        },
      },
    },
  })
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
}
