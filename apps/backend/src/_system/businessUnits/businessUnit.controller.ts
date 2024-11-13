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
import { BusinessUnitsService } from './businessUnit.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import {
  BusinessUnitCreateDto,
  BusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';

@Controller('api/v1/system/businessUnits')
@ApiTags('system/businessUnit')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class BusinessUnitsController {
  constructor(private readonly tenantsService: BusinessUnitsService) {}

  private readonly logger = new Logger(BusinessUnitsController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.tenantsService.findOne(req, id);
  }

  @Get()
  @ApiUserFilterQueries()
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
    const defaultSearchFields: string[] = [
      'name',
      'code',
      'symbol',
      'description',
    ];

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
    return this.tenantsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: BusinessUnitCreateDto,
    description: 'BusinessUnitCreateDto',
  })
  async create(@Body() createDto: BusinessUnitCreateDto, @Req() req: Request) {
    return this.tenantsService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: BusinessUnitUpdateDto,
    description: 'CurrencyUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    return this.tenantsService.update(req, id, updateDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.tenantsService.delete(req, id);
  }
}
