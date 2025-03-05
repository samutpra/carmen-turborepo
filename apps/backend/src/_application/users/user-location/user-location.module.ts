import { Module } from '@nestjs/common';
import { UserLocationController } from './user-location.controller';
import { UserLocationService } from './user-location.service';

@Module({
  controllers: [UserLocationController],
  providers: [UserLocationService],
  exports: [UserLocationService],
})
export class UserLocationModule {}
