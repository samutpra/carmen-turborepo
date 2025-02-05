import QueryParams from 'lib/types';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

import { ProductLocationService } from './product-location.service';

@ApiTags('product-location')
@Controller('api/v1/product-location')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class ProductLocationController {
  constructor(
    private readonly productLocationService: ProductLocationService,
  ) {}

  private readonly logger = new Logger(ProductLocationController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async getLocationsByProductId(
    @Req() req: Request,
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('perpage') perpage?: number,
    @Query('search') search?: string,
  ) {
    this.logger.debug({
      file: ProductLocationController.name,
      function: this.getLocationsByProductId.name,
    });
    this.logger.debug({
      id: id,
      page: page,
      perpage: perpage,
      search: search,
    });

    const q = new QueryParams(page, perpage, search);

    this.logger.debug({ q: q });
    return this.productLocationService.getLocationsByProductId(req, id, q);
  }
}
