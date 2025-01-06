import { InvalidTokenException } from 'lib/utils';
import {
  PrismaClientManagerService,
} from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaClient as dbSystem } from '@prisma-carmen-client-system';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private prismaClientMamager: PrismaClientManagerService) {
    super();
  }

  private db_System: dbSystem;

  private logger = new Logger(JwtAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // เรียกใช้ parent canActivate ก่อน
      const parentCanActivate = await super.canActivate(context);
      if (!parentCanActivate) {
        this.logger.debug('Parent guard validation failed');
        return false;
      }

      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        this.logger.debug('No token provided');
        return false;
      }

      this.logger.debug({ token: token });

      // ตรวจสอบ token ในฐานข้อมูล
      this.logger.debug(4);
      // const isValidToken = await this.authService.checkDatabaseToken(token);
      this.logger.debug(`Checking database token`);
      this.db_System = this.prismaClientMamager.getSystemDB();
      const refreshTokenList =
        await this.db_System.tb_user_login_session.findFirst({
          where: {
            token: {
              equals: token,
              mode: 'insensitive',
            },
          },
        });
      this.logger.debug(refreshTokenList);

      if (!refreshTokenList) {
        throw new InvalidTokenException('Invalid token');
      }

      return refreshTokenList ? true : false;

      // const refreshTokenList =
      //   await this.db_System.tb_user_login_session.findFirst({
      //     where: {
      //       token: token,
      //     },
      //   });

      // if (!refreshTokenList) {
      //   throw new InvalidTokenException('Invalid token');
      // }

      // return refreshTokenList ? true : false;

      // this.logger.debug('5');
      // if (!isValidToken) {
      //   this.logger.debug('Token not found in database');
      // }

      // this.logger.debug('6');
      // return isValidToken;
    } catch (error) {
      this.logger.error('JWT validation failed:', error);
      return false;
    }
  }
}
