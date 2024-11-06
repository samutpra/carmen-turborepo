import { Module } from '@nestjs/common';
import { UserBusinessUnitController } from './user-bussinessUnit.controller';
import { UserBusinessUnitService } from './user-bussinessUnit.service';

@Module({
  controllers: [UserBusinessUnitController],
  providers: [UserBusinessUnitService],
})
export class UserBussinessUnitModule {}
