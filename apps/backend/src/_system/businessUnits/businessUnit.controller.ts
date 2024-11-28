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
  UsePipes,
} from '@nestjs/common';
import { BusinessUnitsService } from './businessUnit.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import {
  BusinessUnitCreateSchema,
  BusinessUnitCreateDto,
  BusinessUnitUpdateSchema,
  BusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';

@Controller('system-api/v1/businessUnits')
@ApiTags('system/businessUnit')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class BusinessUnitsController {
  constructor(private readonly tenantsService: BusinessUnitsService) {}

  private readonly logger = new Logger(BusinessUnitsController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.tenantsService.findOne(req, id);
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
    return this.tenantsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: BusinessUnitCreateDto,
    description: 'BusinessUnitCreateDto',
  })
  @UsePipes(new ZodValidationPipe(BusinessUnitCreateSchema))
  async create(@Body() createDto: BusinessUnitCreateDto, @Req() req: Request) {
    return this.tenantsService.create(req, createDto);
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
    const parseObj = BusinessUnitUpdateSchema.safeParse(updateDto);
    if (!parseObj.success) {
      throw new Error(parseObj.error.message);
    }
    const updatedto = parseObj.data;
    updatedto.id = id;
    return this.tenantsService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.tenantsService.delete(req, id);
  }
}
