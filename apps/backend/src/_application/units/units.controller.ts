import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  UnitCreateDto,
  UnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UnitsService } from './units.service';

@Controller('api/v1/units')
@ApiTags('units')
@ApiBearerAuth()
@ApiHeader({
	name: 'x-tenant-id',
	description: 'tenant id'
})
@UseGuards(JwtAuthGuard)
export class UnitsController {
	constructor(private readonly unitsService: UnitsService) {}

	private readonly logger = new Logger(UnitsController.name);

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async findOne(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id });
		return this.unitsService.findOne(req, id);
	}

	@Get()
	@ApiUserFilterQueries()
	async findAll(
		@Req() req: Request,
		@Query('page') page?: number,
		@Query('perpage') perpage?: number,
		@Query('search') search?: string,
		@Query('searchfields') searchfields?: string,
		@Query('filter') filter?: Record<string, string>,
		@Query('sort') sort?: string,
		@Query('advance') advance?: QueryAdvance
	) {
		const defaultSearchFields: string[] = [
			'name'
		];

		this.logger.debug({
			page: page,
			perpage: perpage,
			search: search,
			searchfields: searchfields,
			filter: filter,
			sort: sort,
			advance: advance
		});

		const q = new QueryParams(page, perpage, search, searchfields, defaultSearchFields, filter, sort, advance);

		this.logger.debug({ q: q });

		return this.unitsService.findAll(req, q);
	}

	@Post()
	@ApiBody({
		type: UnitCreateDto,
		description: 'UnitCreateDto'
	})
	async create(@Body() createDto: any, @Req() req: Request) {
		this.logger.debug({ createDto: createDto });
		return this.unitsService.create(req, createDto);
	}

	@Patch(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	@ApiBody({
		type: UnitUpdateDto,
		description: 'UnitUpdateDto'
	})
	async update(@Param('id') id: string, @Body() updateDto: any, @Req() req: Request) {
		const { ...updatedto } = updateDto;
		updatedto.id = id;
		this.logger.debug({ id: id, updateDto: updateDto });
		return this.unitsService.update(req, id, updatedto);
	}

	@Delete(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async remove(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id });
		return this.unitsService.delete(req, id);
	}
}
