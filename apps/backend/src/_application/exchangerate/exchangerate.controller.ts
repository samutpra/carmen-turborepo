import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  ExchangeRateCreateDto,
  ExchangeRateUpdateDto,
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

import { ExchangerateService } from './exchangerate.service';

@Controller('api/v1/exchangerate')
@ApiTags('exchangerate')
@ApiBearerAuth()
@ApiHeader({
	name: 'x-tenant-id',
	description: 'tenant id'
})
@UseGuards(JwtAuthGuard)
export class ExchangerateController {
	constructor(private readonly exchangerateService: ExchangerateService) {}

	private readonly logger = new Logger(ExchangerateController.name);

	//#region GET ONE
	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async findOne(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id });
		return this.exchangerateService.findOne(req, id);
	}
	//#endregion GET ONE

	//#region GET ALL
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
		const defaultSearchFields: string[] = [];

		const q = new QueryParams(page, perpage, search, searchfields, defaultSearchFields, filter, sort, advance);

		this.logger.debug({ q: q });
		return this.exchangerateService.findAll(req, q);
	}
	//#endregion GET ALL

	//#region CREATE
	@Post()
	@ApiBody({
		type: ExchangeRateCreateDto,
		description: 'ExchangeRateCreateDto'
	})
	async create(@Body() createDto: any, @Req() req: Request) {
		this.logger.debug({ createDto: createDto });
		return this.exchangerateService.create(req, createDto);
	}
	//#endregion Create

	//#region UPDATE
	@Patch(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	@ApiBody({
		type: ExchangeRateUpdateDto,
		description: 'ExchangeRateUpdateDto'
	})
	async update(@Param('id') id: string, @Body() updateDto: any, @Req() req: Request) {
		const { ...updatedto } = updateDto;
		updatedto.id = id;
		this.logger.debug({ updatedto: updatedto });
		return this.exchangerateService.update(req, id, updatedto);
	}
	//#endregion UPDATE

	//#region DELETE
	@Delete(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async delete(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id });
		return this.exchangerateService.delete(req, id);
	}
	//#endregion DELETE
}
