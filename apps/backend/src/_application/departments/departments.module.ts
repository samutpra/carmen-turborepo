import { Module } from '@nestjs/common';

import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [],
})
export class DepartmentsModule {}
