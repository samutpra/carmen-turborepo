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
  UsePipes,
  BadRequestException,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { SystemClusterService } from './system-cluster.service';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import QueryParams from 'lib/types';
import { QueryAdvance } from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import {
  ClusterCreateDto,
  ClusterCreateSchema,
  ClusterUpdateDto,
  ClusterUpdateSchema,
} from '@carmensoftware/shared-dtos';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';

@Controller('system-api/v1/clusters')
@ApiTags('system/cluster')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class SystemClusterController {
  constructor(private readonly systemClusterService: SystemClusterService) {}

  private readonly logger = new Logger(SystemClusterController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.systemClusterService.findOne(req, id);
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
    const defaultSearchFields: string[] = ['code', 'name'];

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
    return this.systemClusterService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ClusterCreateDto,
    description: 'ClusterCreateDto',
  })
  @UsePipes(new ZodValidationPipe(ClusterCreateSchema))
  async create(
    @Body()
    createDto: ClusterCreateDto,
    @Req() req: Request,
  ) {
    const parseObj = ClusterCreateSchema.safeParse(createDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }
    return this.systemClusterService.create(req, createDto);
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
    @Body() updateDto: ClusterUpdateDto,
    @Req() req: Request,
  ) {
    const parseObj = ClusterUpdateSchema.safeParse(updateDto);

    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }

    const updatedto = parseObj.data;
    updatedto.id = id;
    return this.systemClusterService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.systemClusterService.delete(req, id);
  }
}
