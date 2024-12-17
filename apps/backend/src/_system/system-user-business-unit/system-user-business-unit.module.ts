import { Module } from '@nestjs/common';

import { SystemUserBusinessUnitController } from './system-user-business-unit.controller';
import { SystemUserBusinessUnitService } from './system-user-business-unit.service';

@Module({
  controllers: [SystemUserBusinessUnitController],
  providers: [SystemUserBusinessUnitService],
})
export class SystemUserBusinessUnitModule {}
