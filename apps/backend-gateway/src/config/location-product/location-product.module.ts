import { Module } from '@nestjs/common';
import { LocationProductService } from './location-product.service';
import { LocationProductController } from './location-product.controller';

@Module({
  controllers: [LocationProductController],
  providers: [LocationProductService],
})
export class LocationProductModule {}
