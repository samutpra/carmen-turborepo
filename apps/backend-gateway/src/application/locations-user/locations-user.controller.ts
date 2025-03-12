import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { LocationsUserService } from './locations-user.service';

@Controller('locations-user')
export class LocationsUserController {
  constructor(private readonly locationsUserService: LocationsUserService) {}

  @Get(':userId')
  async getLocationByUserId(@Param('userId') userId: string) {
    return this.locationsUserService.getLocationByUserId(userId);
  }

  @Put(':userId')
  async managerLocationUser(
    @Param('userId') userId: string,
    @Body() updateDto: any,
  ) {
    return this.locationsUserService.managerLocationUser(userId, updateDto);
  }
}
