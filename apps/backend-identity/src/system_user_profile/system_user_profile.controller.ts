import { Body, Request } from '@nestjs/common';
import {
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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'nest-supabase-guard/dist/supabase-auth.guard';
import { SystemUserProfileService } from './system_user_profile.service';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { UserProfileCreateDto, UserProfileUpdateDto } from 'shared-dtos';
@Controller('system-api/v1/user-profile')
@ApiTags('system/user-profile')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
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
    this.logger.log({ id });
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
    return this.systemUserProfileService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UserProfileCreateDto,
    description: 'UserProfileCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    this.logger.log({ createDto });
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
    this.logger.log({ updatedto });
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
    this.logger.log({ id });
    return this.systemUserProfileService.delete(req, id);
  }
}
