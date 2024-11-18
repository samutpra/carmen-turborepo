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
import { UserProfileService } from './user-profile.service';
import { QueryAdvance } from 'lib/types';
import {
  UserProfileCreateDto,
  UserProfileUpdateDto,
} from '@carmensoftware/shared-dtos';
import QueryParams from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';

@Controller('api/v1/system/user-profile')
@ApiTags('system/user-profile')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  private readonly logger = new Logger(UserProfileController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.userProfileService.findOne(req, id);
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
    return this.userProfileService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UserProfileCreateDto,
    description: 'UserProfileCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    return this.userProfileService.create(req, createDto);
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
    return this.userProfileService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.userProfileService.delete(req, id);
  }
}
