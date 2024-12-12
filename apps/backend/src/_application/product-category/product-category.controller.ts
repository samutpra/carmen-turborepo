import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  ProductCategoryCreateDto,
  ProductCategoryUpdateDto,
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

import { ProductCategoryService } from './product-category.service';

@Controller('api/v1/product-category')
@ApiTags('product-category')
@ApiBearerAuth()
@ApiHeader({
	name: 'x-tenant-id',
	description: 'tenant id'
})
@UseGuards(JwtAuthGuard)
export class ProductCategoryController {
	constructor(private readonly productCategoryService: ProductCategoryService) {}

	private readonly logger = new Logger(ProductCategoryController.name);

	@Get(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async fineOne(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id });
		return this.productCategoryService.findOne(req, id);
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
		this.logger.debug({ q: q });
		return this.productCategoryService.findAll(req, q);
	}

	@Post()
	@ApiBody({
		type: ProductCategoryCreateDto,
		description: 'ProductCategoryCreateDto'
	})
	async create(@Body() createDto: any, @Req() req: Request) {
		this.logger.debug({ createDto: createDto });
		return this.productCategoryService.create(req, createDto);
	}

	@Patch(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	@ApiBody({
		type: ProductCategoryUpdateDto,
		description: 'ProductCategoryUpdateDto'
	})
	async update(@Param('id') id: string, @Body() updateDto: any, @Req() req: Request) {
		const { ...updatedto } = updateDto;
		updatedto.id = id;
		this.logger.debug({ updatedto: updatedto });
		return this.productCategoryService.update(req, id, updatedto);
	}

	@Delete(':id')
	@ApiParam({
		name: 'id',
		description: 'id',
		required: true,
		type: 'uuid'
	})
	async delete(@Param('id') id: string, @Req() req: Request) {
		this.logger.debug({ id: id });
		return this.productCategoryService.delete(req, id);
	}
}
