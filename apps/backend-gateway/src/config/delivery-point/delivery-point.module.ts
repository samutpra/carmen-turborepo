import { Module } from '@nestjs/common';
import { DeliveryPointService } from './delivery-point.service';
import { DeliveryPointController } from './delivery-point.controller';

@Module({
  controllers: [DeliveryPointController],
  providers: [DeliveryPointService],
})
export class DeliveryPointModule {}
