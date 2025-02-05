import { Module } from '@nestjs/common';

import { LocationProductController } from './location-product.controller';
import { LocationProductService } from './location-product.service';

@Module({
  controllers: [LocationProductController],
  providers: [LocationProductService],
})
export class LocationProductModule {}
