import { Module } from '@nestjs/common';
import { UserTenantController } from './user-tenant.controller';
import { UserTenantService } from './user-tenant.service';

@Module({
  controllers: [UserTenantController],
  providers: [UserTenantService],
})
export class UserTenantModule {}
