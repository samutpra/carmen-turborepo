import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import { ProductSubCategoryCreateDto, ProductSubCategoryUpdateDto } from '@carmensoftware/shared-dtos';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

import { ProductSubCategoryService } from './product-sub-category.service';

@Controller('api/v1/product-sub-category')
@ApiTags('Product-sub-category')
@ApiBearerAuth()
@ApiHeader({
	name: 'x-tenant-id',
	description: 'tenant id'
})
@UseGuards(JwtAuthGuard)
export class ProductSubCategoryController {
	constructor(private readonly productSubCategoryService: ProductSubCategoryService) {}

	private readonly logger = new Logger(ProductSubCategoryController.name);

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async fineOne(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id, req: req });
		return this.productSubCategoryService.findOne(req, id);
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
		const defaultSearchFields: string[] = [];

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
		return this.productSubCategoryService.findAll(req, q);
	}

	@Post()
	@ApiBody({
		type: ProductSubCategoryCreateDto,
		description: 'ProductSubCategoryCreateDto'
	})
	async create(@Body() createDto: any, @Req() req: Request) {
		this.logger.debug({ createDto: createDto, req: req });
		return this.productSubCategoryService.create(req, createDto);
	}

	@Patch(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	@ApiBody({
		type: ProductSubCategoryUpdateDto,
		description: 'ProductSubCategoryUpdateDto'
	})
	async update(@Param('id') id: string, @Body() updateDto: ProductSubCategoryUpdateDto, @Req() req: Request) {
		const { ...updatedto } = updateDto;
		updatedto.id = id;
		this.logger.debug({ updatedto: updatedto, req: req });
		return this.productSubCategoryService.update(req, id, updatedto);
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
		return this.productSubCategoryService.delete(req, id);
	}
}
