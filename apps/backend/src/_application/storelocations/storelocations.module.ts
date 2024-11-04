import { Module } from '@nestjs/common';
import { StoreLocationsController } from './storelocations.controller';
import { StoreLocationsService } from './storelocations.service';

@Module({
  controllers: [StoreLocationsController],
  providers: [StoreLocationsService],
})
export class StoreLocationsModule {}
