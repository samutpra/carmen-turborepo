import { Module } from '@nestjs/common';

import { SystemUserProfileController } from './system-user-profile.controller';
import { SystemUserProfileService } from './system-user-profile.service';

@Module({
  controllers: [SystemUserProfileController],
  providers: [SystemUserProfileService],
})
export class SystemUserProfileModule {}
