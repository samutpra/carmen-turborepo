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
import { LocationsService } from './locations.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import {
  LocationCreateDto,
  LocationUpdateDto,
} from '@carmensoftware/shared-dtos';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';

@Controller('api/v1/locations')
@ApiTags('locations')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  private readonly logger = new Logger(LocationsController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.locationsService.findOne(req, id);
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
    return this.locationsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: LocationCreateDto,
    description: 'LocationCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    return this.locationsService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: LocationUpdateDto,
    description: 'LocationUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: LocationUpdateDto,
    @Req() req: Request,
  ) {
    return this.locationsService.update(req, id, updateDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.locationsService.delete(req, id);
  }
}
