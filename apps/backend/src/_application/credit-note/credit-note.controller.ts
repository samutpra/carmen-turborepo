import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import { CreditNoteCreateDto, CreditNoteUpdateDto } from '@carmensoftware/shared-dtos';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

import { CreditNoteService } from './credit-note.service';

@Controller('api/v1/credit-note')
@ApiTags('credit-note')
@ApiBearerAuth()
@ApiHeader({
	name: 'x-tenant-id',
	description: 'tenant id'
})
@UseGuards(JwtAuthGuard)
export class CreditNoteController {
	constructor(private readonly creditNoteService: CreditNoteService) {}

	private readonly logger = new Logger(CreditNoteController.name);

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async findOne(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id, req: req });
		return this.creditNoteService.findOne(req, id);
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
			'name',
			'description'
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

		this.logger.debug({ q: q, req: req });
		return this.creditNoteService.findAll(req, q);
	}

	@Post()
	@ApiBody({
		type: CreditNoteCreateDto,
		description: 'CreditNoteCreateDto'
	})
	async create(@Req() req: Request, @Body() createDto: CreditNoteCreateDto) {
		this.logger.debug({ req: req, createDto: createDto });
		return this.creditNoteService.create(req, createDto);
	}

	@Patch(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	@ApiBody({
		type: CreditNoteUpdateDto,
		description: 'CreditNoteUpdateDto'
	})
	async update(@Param('id') id: string, @Req() req: Request, @Body() updateDto: any) {
		const { ...updatedto } = updateDto;
		updatedto.id = id;
		this.logger.debug({ req: req, id: id, updatedto: updatedto });
		return this.creditNoteService.update(req, id, updatedto);
	}

	@Delete(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async delete(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ req: req, id: id });
		return this.creditNoteService.delete(req, id);
	}
}
