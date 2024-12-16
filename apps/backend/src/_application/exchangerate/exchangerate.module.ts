import { Module } from '@nestjs/common';

import { ExchangerateController } from './exchangerate.controller';
import { ExchangerateService } from './exchangerate.service';

@Module({
  controllers: [ExchangerateController],
  providers: [ExchangerateService],
})
export class ExchangerateModule {}
