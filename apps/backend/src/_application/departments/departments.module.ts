import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    // { provide: DrizzleDB, useValue: drizzleConnection },
  ],
  imports: [],
})
export class DepartmentsModule {}
