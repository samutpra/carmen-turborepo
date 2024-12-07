import * as dotenv from 'dotenv';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExtractReqModule } from './extract-req/extract-req.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaClientManagerModule } from '../prisma-client-manager/prisma-client-manager.module';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { SendMailModule } from 'src/_lib/send-mail/send-mail.module';
import { SystemUserModule } from 'src/_system/system-users/system-users.module';

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
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
