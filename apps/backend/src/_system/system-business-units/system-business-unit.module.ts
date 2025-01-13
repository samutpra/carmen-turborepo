import { Module } from '@nestjs/common';

import { SystemBusinessUnitController } from './system-business-unit.controller';
import { SystemBusinessUnitService } from './system-business-unit.service';

@Module({
  controllers: [SystemBusinessUnitController],
  providers: [SystemBusinessUnitService],
})
export class SystemBusinessUnitsModule {}
