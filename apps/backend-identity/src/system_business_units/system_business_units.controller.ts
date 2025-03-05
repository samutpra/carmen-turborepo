import {
  Controller,
  Logger,
  Param,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Query,
  Body,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { SystemBusinessUnitsService } from './system_business_units.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'nest-supabase-guard/dist/supabase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';
import {
  BusinessUnitCreateSchema,
  BusinessUnitUpdateDto,
  BusinessUnitUpdateSchema,
} from 'shared-dtos/business-unit.dto';
import { BusinessUnitCreateDto } from 'shared-dtos/business-unit.dto';

@Controller('system-api/v1/business-units')
@ApiTags('system/business-unit')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
export class SystemBusinessUnitsController {
  constructor(
    private readonly systemBusinessUnitsService: SystemBusinessUnitsService,
  ) {}

  private readonly logger = new Logger(SystemBusinessUnitsController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.log({ id: id });
    return this.systemBusinessUnitsService.findOne(req, id);
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
    return this.systemBusinessUnitsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: BusinessUnitCreateDto,
    description: 'BusinessUnitCreateDto',
  })
  @UsePipes(new ZodValidationPipe(BusinessUnitCreateSchema))
  async create(@Body() createDto: BusinessUnitCreateDto, @Req() req: Request) {
    this.logger.log({ createDto });
    const parseObj = BusinessUnitCreateSchema.safeParse(createDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }

    this.logger.log({ parseObj });
    return this.systemBusinessUnitsService.create(req, createDto);
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
    description: 'BusinessUnitUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: BusinessUnitUpdateDto,
    @Req() req: Request,
  ) {
    this.logger.log({ updateDto });
    const parseObj = BusinessUnitUpdateSchema.safeParse(updateDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }
    const updatedto = parseObj.data;
    updatedto.id = id;

    this.logger.log({ updatedto });
    return this.systemBusinessUnitsService.update(req, id, updatedto);
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
    return this.systemBusinessUnitsService.delete(req, id);
  }
}
