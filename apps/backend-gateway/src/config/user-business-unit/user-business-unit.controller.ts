import { Controller, Get, Param } from '@nestjs/common';
import { UserBusinessUnitService } from './user-business-unit.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/user-business-unit')
@ApiTags('Config - User Business Unit')
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
