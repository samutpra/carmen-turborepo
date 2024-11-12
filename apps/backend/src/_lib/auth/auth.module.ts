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
import { UserModule } from 'src/_system/users/users.module';

dotenv.config();

@Module({
  imports: [
    PrismaClientManagerModule,
    UserModule,
    PassportModule,
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
