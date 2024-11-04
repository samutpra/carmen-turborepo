import { Global, Module } from '@nestjs/common';

import { ExtractReqService } from './extract-req.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  providers: [ExtractReqService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  exports: [ExtractReqService],
})
export class ExtractReqModule {}
