import { Controller, Get, Param } from '@nestjs/common';
import { ProductLocationService } from './product-location.service';

@Controller('product-location')
export class ProductLocationController {
  constructor(
    private readonly productLocationService: ProductLocationService,
  ) {}

  @Get(':productId')
  async getLocationsByProductId(@Param('productId') productId: string) {
    return this.productLocationService.getLocationsByProductId(productId);
  }
}
