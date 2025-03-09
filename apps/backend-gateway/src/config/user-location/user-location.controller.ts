import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserLocationService } from './user-location.service';

@Controller('user-location')
export class UserLocationController {
  constructor(private readonly userLocationService: UserLocationService) {}

  @Get(':locationId')
  async getUsersByLocationId(@Param('locationId') locationId: string) {
    return this.userLocationService.getUsersByLocationId(locationId);
  }

  @Put(':locationId')
  async managerUserLocation(
    @Param('locationId') locationId: string,
    @Body() updateDto: any,
  ) {
    return this.userLocationService.managerUserLocation(locationId, updateDto);
  }
}
