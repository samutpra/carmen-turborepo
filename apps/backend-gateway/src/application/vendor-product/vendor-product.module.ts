import { Module } from '@nestjs/common';
import { VendorProductService } from './vendor-product.service';
import { VendorProductController } from './vendor-product.controller';

@Module({
  controllers: [VendorProductController],
  providers: [VendorProductService],
})
export class VendorProductModule {}
