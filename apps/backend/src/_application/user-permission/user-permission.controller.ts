import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { UserPermissionService } from './user-permission.service';

@Controller('api/v1/user-permission')
export class UserPermissionController {
	constructor(private readonly userPermissionService: UserPermissionService) {}

	private readonly logger = new Logger(UserPermissionController.name);

	@Get(':permission')
	@ApiParam({
		name: 'permission',
		description: 'permission',
		required: true,
		type: 'string'
	})
	@ApiQuery({
		name: 'as-list',
		type: 'boolean',
		required: false
	})
	async getPermission(
		@Param('permission') permission: string,
		@Req() req: Request,
		@Query('as-list') asList?: boolean
	) {
		this.logger.debug({ permission: permission, asList: asList });
		return this.userPermissionService.getPermissions(req, permission, asList);
	}
}
