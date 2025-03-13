import { Module } from '@nestjs/common';
import { DepartmentUserService } from './department-user.service';
import { DepartmentUserController } from './department-user.controller';

@Module({
  controllers: [DepartmentUserController],
  providers: [DepartmentUserService],
})
export class DepartmentUserModule {}
