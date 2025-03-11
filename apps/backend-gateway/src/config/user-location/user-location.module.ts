import { Module } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { UserLocationController } from './user-location.controller';

@Module({
  controllers: [UserLocationController],
  providers: [UserLocationService],
})
export class UserLocationModule {}
