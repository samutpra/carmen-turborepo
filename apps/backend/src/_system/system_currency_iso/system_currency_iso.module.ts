import { Module } from '@nestjs/common';

import { SystemCurrencyIsoController } from './system_currency_iso.controller';
import { SystemCurrencyIsoService } from './system_currency_iso.service';

@Module({
  controllers: [SystemCurrencyIsoController],
  providers: [SystemCurrencyIsoService],
})
export class SystemCurrencyIsoModule {}
