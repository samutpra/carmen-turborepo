import { Controller } from '@nestjs/common';
import { VendorProductService } from './vendor-product.service';

@Controller('vendor-product')
export class VendorProductController {
  constructor(private readonly vendorProductService: VendorProductService) {}
}
