import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { LocationsUserService } from './locations-user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/locations/user')
@ApiTags('Config - Location User')
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
