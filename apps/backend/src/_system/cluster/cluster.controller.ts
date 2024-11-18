import { ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Delete,
  Post,
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Req,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { ClusterService } from './cluster.service';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import QueryParams from 'lib/types';
import { QueryAdvance } from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import {
  ClusterCreateDto,
  ClusterUpdateDto,
} from '@carmensoftware/shared-dtos';

@Controller('api/v1/system/clusters')
@ApiTags('system/cluster')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  private readonly logger = new Logger(ClusterController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.clusterService.findOne(req, id);
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
    return this.clusterService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ClusterCreateDto,
    description: 'ClusterCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    return this.clusterService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: ClusterUpdateDto,
    description: 'ClusterUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    const { ...updatedto } = updateDto;
    updatedto.id = id;
    return this.clusterService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.clusterService.delete(req, id);
  }
}
