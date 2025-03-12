import { Controller, Get, Param } from '@nestjs/common';
import { LocationProductService } from './location-product.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/location-product')
@ApiTags('Config - Location Product')
export class LocationProductController {
  constructor(
    private readonly locationProductService: LocationProductService,
  ) {}

  @Get(':locationId')
  async getProductByLocationId(@Param('locationId') locationId: string) {
    return this.locationProductService.getProductByLocationId(locationId);
  }
}
