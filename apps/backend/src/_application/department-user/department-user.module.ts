import { Module } from '@nestjs/common';
import { DepartmentUserController } from './department-user.controller';
import { DepartmentUserService } from './department-user.service';

@Module({
  controllers: [DepartmentUserController],
  providers: [DepartmentUserService],
  exports: [DepartmentUserService],
})
export class DepartmentUserModule {}
