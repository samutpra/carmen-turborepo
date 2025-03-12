import { Controller } from '@nestjs/common';
import { VendorProductService } from './vendor-product.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/application/vendor-product')
@ApiTags('Application - Vendor Product')
export class VendorProductController {
  constructor(private readonly vendorProductService: VendorProductService) {}
}
