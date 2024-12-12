import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import { ProductCreateDto, ProductUpdateDto } from '@carmensoftware/shared-dtos';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';

@Controller('api/v1/products')
@ApiTags('products')
@ApiBearerAuth()
@ApiHeader({
	name: 'x-tenant-id',
	description: 'tenant id'
})
@UseGuards(JwtAuthGuard)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	private readonly logger = new Logger(ProductsController.name);

	@Get()
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async findOne(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id, req: req });
		return this.productsService.findOne(req, id);
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
			'code',
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
		return this.productsService.findAll(req, q);
	}

	@Post()
	@ApiBody({
		type: ProductCreateDto,
		description: 'ProductCreateDto'
	})
	async create(@Body() createDto: any, @Req() req: Request) {
		this.logger.debug({ createDto: createDto, req: req });
		return this.productsService.create(req, createDto);
	}

	@Patch(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	@ApiBody({
		type: ProductUpdateDto,
		description: 'ProductUpdateDto'
	})
	async update(@Param('id') id: string, @Body() updateDto: any, @Req() req: Request) {
		const { ...updatedto } = updateDto;
		updatedto.id = id;
		this.logger.debug({ id: id, updateDto: updateDto, req: req });
		return this.productsService.update(req, id, updatedto);
	}

	@Delete(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async delete(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id, req: req });
		return this.productsService.delete(req, id);
	}
}
