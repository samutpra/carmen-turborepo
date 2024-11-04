import { ExchangerateController } from './exchangerate.controller';
import { ExchangerateService } from './exchangerate.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ExchangerateController],
  providers: [ExchangerateService],
})
export class ExchangerateModule {}
