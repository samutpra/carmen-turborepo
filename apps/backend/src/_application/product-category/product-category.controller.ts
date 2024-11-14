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
  ProductCategoryCreateDto,
  ProductCategoryUpdateDto,
} from '@carmensoftware/shared-dtos';

import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import QueryParams from 'lib/types';
import { QueryAdvance } from 'lib/types';
import { ProductCategoryService } from './product-category.service';

@Controller('api/v1/product-category')
@ApiTags('product-category')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  private readonly logger = new Logger(ProductCategoryController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async fineOne(@Param('id') id: string, @Req() req: Request) {
    return this.productCategoryService.findOne(req, id);
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('perpage') perpage: number,
    @Query('search') search: string = '',
    @Query('searchfields') searchfields: string = '',
    @Query('filter') filter: Record<string, string> = {},
    @Query('sort') sort: string = '',
    @Query('advance') advance: QueryAdvance = null,
  ) {
    const defaultSearchFields: string[] = [];

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
    return this.productCategoryService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ProductCategoryCreateDto,
    description: 'ProductCategoryCreateDto',
  })
  async create(
    @Body() createDto: ProductCategoryCreateDto,
    @Req() req: Request,
  ) {
    return this.productCategoryService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: ProductCategoryUpdateDto,
    description: 'ProductCategoryUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: ProductCategoryUpdateDto,
    @Req() req: Request,
  ) {
    return this.productCategoryService.update(req, id, updateDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.productCategoryService.delete(req, id);
  }
}
