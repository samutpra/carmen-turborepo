import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

dotenv.config();

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    const logger = new Logger(RefreshJwtStrategy.name);
    logger.debug(`validate payload: ${JSON.stringify(payload)}`);

    const {
      email,
      consent,
      createdAt,
      createById,
      updateAt,
      updateById,
      is_refresh,
      ...res
    } = payload;

    if (!is_refresh) {
      return null;
    }
    return res;
  }
}
