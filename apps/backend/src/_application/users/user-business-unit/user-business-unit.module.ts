import { Module } from '@nestjs/common';
import { UserBusinessUnitController } from './user-business-unit.controller';
import { UserBusinessUnitService } from './user-business-unit.service';

@Module({
  controllers: [UserBusinessUnitController],
  providers: [UserBusinessUnitService],
  exports: [UserBusinessUnitService],
})
export class User_BusinessUnitModule {}
