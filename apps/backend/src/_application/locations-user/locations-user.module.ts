import { Module } from '@nestjs/common';
import { LocationsUserController } from './locations-user.controller';
import { LocationsUserService } from './locations-user.service';

@Module({
  controllers: [LocationsUserController],
  providers: [LocationsUserService],
  exports: [LocationsUserService],
})
export class LocationsUserModule {}
