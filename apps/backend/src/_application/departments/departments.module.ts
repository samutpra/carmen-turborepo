import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [],
})
export class DepartmentsModule {}
