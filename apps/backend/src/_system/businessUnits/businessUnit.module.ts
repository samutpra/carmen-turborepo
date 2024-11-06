import { BusinessUnitsController } from './businessUnit.controller';
import { BusinessUnitsService } from './businessUnit.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BusinessUnitsController],
  providers: [BusinessUnitsService],
})
export class BusinessUnitsModule {}
