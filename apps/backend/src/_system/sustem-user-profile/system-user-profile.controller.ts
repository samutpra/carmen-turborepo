import {
  Delete,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiHeader } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { SystemUserProfileService } from './system-user-profile.service';
import { QueryAdvance } from 'lib/types';
import {
  UserProfileCreateDto,
  UserProfileUpdateDto,
} from '@carmensoftware/shared-dtos';
import QueryParams from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';

@Controller('system-api/v1/user-profile')
@ApiTags('system/user-profile')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class SystemUserProfileController {
  constructor(
    private readonly systemUserProfileService: SystemUserProfileService,
  ) {}

  private readonly logger = new Logger(SystemUserProfileController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.systemUserProfileService.findOne(req, id);
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
    return this.systemUserProfileService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UserProfileCreateDto,
    description: 'UserProfileCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    return this.systemUserProfileService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: UserProfileUpdateDto,
    description: 'UserProfileUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    const { ...updatedto } = updateDto;
    updatedto.id = id;
    return this.systemUserProfileService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.systemUserProfileService.delete(req, id);
  }
}
