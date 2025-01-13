import { Module } from '@nestjs/common';

import { DeliveryPointController } from './delivery-point.controller';
import { DeliveryPointService } from './delivery-point.service';

@Module({
  controllers: [DeliveryPointController],
  providers: [DeliveryPointService],
})
export class DeliveryPointModule {}
