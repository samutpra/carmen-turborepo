import { Module } from '@nestjs/common';
import { ProductLocationService } from './product-location.service';
import { ProductLocationController } from './product-location.controller';

@Module({
  controllers: [ProductLocationController],
  providers: [ProductLocationService],
})
export class ProductLocationModule {}
