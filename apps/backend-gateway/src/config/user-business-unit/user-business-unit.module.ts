import { Module } from '@nestjs/common';
import { UserBusinessUnitService } from './user-business-unit.service';
import { UserBusinessUnitController } from './user-business-unit.controller';

@Module({
  controllers: [UserBusinessUnitController],
  providers: [UserBusinessUnitService],
})
export class UserBusinessUnitModule {}
