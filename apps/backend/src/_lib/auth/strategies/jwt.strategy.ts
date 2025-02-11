import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: any) {
    const logger = new Logger(JwtStrategy.name);
    logger.debug(`validate payload: ${JSON.stringify(payload)}`);

    const {
      email,
      consent,
      createdAt,
      createById,
      updateAt,
      updateById,
      ...res
    } = payload;
    return res;
  }
}
