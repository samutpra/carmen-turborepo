import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import {
  ProductCreateDto,
  ProductUpdateDto,
} from 'shared-dtos';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

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

import { ProductsService } from './products.service';

@Controller('api/v1/products')
@ApiTags('products')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private readonly logger = new Logger(ProductsController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
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
    @Query('advance') advance?: QueryAdvance,
  ) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.findAll.name,
    });
    const defaultSearchFields: string[] = ['code', 'name', 'description'];

    this.logger.debug({
      page: page,
      perpage: perpage,
      search: search,
      searchfields: searchfields,
      filter: filter,
      sort: sort,
      advance: advance,
    });

    const q = new QueryParams(
      page,
      perpage,
      search,
      searchfields,
      defaultSearchFields,
      filter,
      sort,
      advance,
    );

    this.logger.debug({ q: q });
    return this.productsService.findAll(req, q);
  }

  @Get('by-item-group-id/:id')
  @ApiUserFilterQueries()
  async getByItemsGroup(
    @Req() req: Request,
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('perpage') perpage?: number,
    @Query('search') search?: string,
    @Query('searchfields') searchfields?: string,
    @Query('filter') filter?: Record<string, string>,
    @Query('sort') sort?: string,
    @Query('advance') advance?: QueryAdvance,
  ) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.getByItemsGroup.name,
    });
    const defaultSearchFields: string[] = [];

    this.logger.debug({
      id: id,
      page: page,
      perpage: perpage,
      search: search,
      searchfields: searchfields,
      filter: filter,
      sort: sort,
      advance: advance,
    });

    const q = new QueryParams(
      page,
      perpage,
      search,
      searchfields,
      defaultSearchFields,
      filter,
      sort,
      advance,
    );

    return this.productsService.getByItemsGroup(req, q, id);
  }

  @Post()
  @ApiBody({
    type: ProductCreateDto,
    description: 'ProductCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ createDto: createDto });
    return this.productsService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: ProductUpdateDto,
    description: 'ProductUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.update.name,
    });
    const { ...updatedto } = updateDto;
    updatedto.id = id;
    this.logger.debug({ id: id, updateDto: updateDto });
    return this.productsService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.delete.name,
    });
    this.logger.debug({ id: id });
    return this.productsService.delete(req, id);
  }
}
