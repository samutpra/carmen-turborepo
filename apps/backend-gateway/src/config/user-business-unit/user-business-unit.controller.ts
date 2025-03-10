import { Controller, Get, Param } from '@nestjs/common';
import { UserBusinessUnitService } from './user-business-unit.service';

@Controller('user-business-unit')
export class UserBusinessUnitController {
  constructor(
    private readonly userBusinessUnitService: UserBusinessUnitService,
  ) {}

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.userBusinessUnitService.findOne(userId);
  }

  @Get('default-tenant')
  async setDefaultTenant(@Param('userId') userId: string) {
    return this.userBusinessUnitService.setDefaultTenant(userId);
  }
}
