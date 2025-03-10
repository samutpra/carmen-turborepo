import { Controller, Get, Param } from '@nestjs/common';
import { LocationProductService } from './location-product.service';

@Controller('location-product')
export class LocationProductController {
  constructor(
    private readonly locationProductService: LocationProductService,
  ) {}

  @Get(':locationId')
  async getProductByLocationId(@Param('locationId') locationId: string) {
    return this.locationProductService.getProductByLocationId(locationId);
  }
}
