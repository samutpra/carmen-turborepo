import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  ClusterCreateDto,
  ClusterCreateSchema,
  ClusterUpdateDto,
  ClusterUpdateSchema,
} from '@carmensoftware/shared-dtos';
import {
  BadRequestException,
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
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SystemClusterService } from './system-cluster.service';

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
    this.logger.log({ id });
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

    this.logger.log({
      page,
      perpage,
      search,
      searchfields,
      filter,
      sort,
      advance,
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

    this.logger.log({ q });
    return this.systemClusterService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ClusterCreateDto,
    description: 'ClusterCreateDto',
  })
  @UsePipes(new ZodValidationPipe(ClusterCreateSchema))
  async create(@Body() createDto: ClusterCreateDto, @Req() req: Request) {
    this.logger.log({ createDto });
    const parseObj = ClusterCreateSchema.safeParse(createDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }
    this.logger.log({ parseObj });
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
    this.logger.log({ id, updateDto });
    const parseObj = ClusterUpdateSchema.safeParse(updateDto);

    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }

    const updatedto = parseObj.data;
    updatedto.id = id;
    this.logger.log({ updatedto });
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
    this.logger.log({ id });
    return this.systemClusterService.delete(req, id);
  }
}
