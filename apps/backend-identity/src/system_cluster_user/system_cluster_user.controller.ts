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
import { SystemClusterUserService } from './system_cluster_user.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'nest-supabase-guard/dist/supabase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryAdvance } from 'lib/types';
import QueryParams from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import {
  ClusterUserCreateDto,
  ClusterUserUpdateDto,
} from 'shared-dtos/cluster-user/cluster-user.dto';
@Controller('api/v1/cluster-user')
@ApiTags('cluster-user')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
export class SystemClusterUserController {
  constructor(
    private readonly systemClusterUserService: SystemClusterUserService,
  ) {}

  private readonly logger = new Logger(SystemClusterUserController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.systemClusterUserService.findOne(req, id);
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
    const defaultSearchFields: string[] = ['name', 'description'];

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
    return this.systemClusterUserService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ClusterUserCreateDto,
    description: 'ClusterUserCreateDto',
  })
  async create(@Req() req: Request, @Body() body: ClusterUserCreateDto) {
    this.logger.debug({
      file: SystemClusterUserController.name,
      function: this.create.name,
      body: body,
    });
    this.logger.debug({ body: body });
    return this.systemClusterUserService.create(req, body);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: ClusterUserUpdateDto,
    description: 'ClusterUserUpdateDto',
  })
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ClusterUserUpdateDto,
  ) {
    this.logger.debug({ body: body });
    return this.systemClusterUserService.update(req, id, body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.systemClusterUserService.delete(req, id);
  }
}
