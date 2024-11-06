import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
