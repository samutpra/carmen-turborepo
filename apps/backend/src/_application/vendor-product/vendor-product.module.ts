import { Module } from '@nestjs/common';

import { VendorProductController } from './vendor-product.controller';
import { VendorProductService } from './vendor-product.service';

@Module({
  controllers: [VendorProductController],
  providers: [VendorProductService],
})
export class VendorProductModule {}
