import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitCreateSchema,
  UserBusinessUnitUpdateDto,
  UserBusinessUnitUpdateSchema,
} from 'shared-dtos';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

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

import { SystemUserBusinessUnitService } from './system-user-business-unit.service';

@Controller('system-api/v1/user-business-unit')
@ApiTags('system/user business-nit')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class SystemUserBusinessUnitController {
  constructor(
    private readonly systemUserBusinessUnitService: SystemUserBusinessUnitService,
  ) {}

  private readonly logger = new Logger(SystemUserBusinessUnitController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.log({ id });
    return this.systemUserBusinessUnitService.findOne(req, id);
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
    return this.systemUserBusinessUnitService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UserBusinessUnitCreateDto,
    description: 'UserBusinessUnitCreateDto',
  })
  @UsePipes(new ZodValidationPipe(UserBusinessUnitCreateSchema))
  async create(
    @Body() createDto: UserBusinessUnitCreateDto,
    @Req() req: Request,
  ) {
    this.logger.log({ createDto });
    const parseObj = UserBusinessUnitUpdateSchema.safeParse(createDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }
    this.logger.log({ parseObj });
    return this.systemUserBusinessUnitService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: UserBusinessUnitUpdateDto,
    description: 'UserBusinessUnitUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserBusinessUnitUpdateDto,
    @Req() req: Request,
  ) {
    this.logger.log({ id, updateDto });
    const parseObj = UserBusinessUnitUpdateSchema.safeParse(updateDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }
    const updatedto = parseObj.data;
    updatedto.id = id;
    this.logger.log({ updatedto });
    return this.systemUserBusinessUnitService.update(req, id, updatedto);
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
    return this.systemUserBusinessUnitService.delete(req, id);
  }
}
