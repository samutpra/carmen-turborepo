import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Logger,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ResponseId } from 'lib/helper/iResponse';
import {
  ProductCreateDto,
  ProductUpdateDto,
} from '@carmensoftware/shared-dtos';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';

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

  @Get()
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
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
    const defaultSearchFields: string[] = ['code', 'name', 'description'];

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
    return this.productsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ProductCreateDto,
    description: 'ProductCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
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
    const { ...updatedto } = updateDto;
    updatedto.id = id;
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
    return this.productsService.delete(req, id);
  }
}
