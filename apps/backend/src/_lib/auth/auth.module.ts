import * as dotenv from 'dotenv';
import { SendMailModule } from 'src/_lib/send-mail/send-mail.module';
import { SystemUserModule } from 'src/_system/system-users/system-users.module';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaClientManagerModule } from '../prisma-client-manager/prisma-client-manager.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExtractReqModule } from './extract-req/extract-req.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

dotenv.config();

@Module({
  imports: [
    PrismaClientManagerModule,
    SystemUserModule,
    PassportModule,
    SendMailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    ExtractReqModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
