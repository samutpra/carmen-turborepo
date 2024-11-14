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
import { ProductItemGroupService } from './product-item-group.service';
import {
  ProductItemGroupCreateDto,
  ProductItemGroupUpdateDto,
} from '@carmensoftware/shared-dtos';

import { ResponseId } from 'lib/helper/iResponse';

import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QueryAdvance } from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import QueryParams from 'lib/types';

@Controller('api/v1/product-item-group')
@ApiTags('product-item-group')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class ProductItemGroupController {
  constructor(
    private readonly productItemGroupService: ProductItemGroupService,
  ) {}

  private readonly logger = new Logger(ProductItemGroupController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async fineOne(@Param('id') id: string, @Req() req: Request) {
    return this.productItemGroupService.findOne(req, id);
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
    return this.productItemGroupService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ProductItemGroupCreateDto,
    description: 'ProductItemGroupCreateDto',
  })
  async create(
    @Body() createDto: ProductItemGroupCreateDto,
    @Req() req: Request,
  ) {
    return this.productItemGroupService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: ProductItemGroupUpdateDto,
    description: 'ProductItemGroupUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: ProductItemGroupUpdateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productItemGroupService.update(req, id, updateDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.productItemGroupService.delete(req, id);
  }
}
