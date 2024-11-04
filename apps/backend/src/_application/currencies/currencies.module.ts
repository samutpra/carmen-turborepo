import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
