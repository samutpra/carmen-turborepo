import { Module } from '@nestjs/common';

import { UserPermissionController } from './user-permission.controller';
import { UserPermissionService } from './user-permission.service';

@Module({
	controllers: [
		UserPermissionController
	],
	providers: [
		UserPermissionService
	],
	exports: [
		UserPermissionService
	]
})
export class UserPermissionModule {}
