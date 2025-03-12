import { Module } from '@nestjs/common';
import { LocationsUserService } from './locations-user.service';
import { LocationsUserController } from './locations-user.controller';

@Module({
  controllers: [LocationsUserController],
  providers: [LocationsUserService],
})
export class LocationsUserModule {}
