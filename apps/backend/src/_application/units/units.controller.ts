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
  Query,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { UnitCreateDto, UnitUpdateDto } from '@carmensoftware/shared-dtos';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';

@Controller('api/v1/units')
@ApiTags('units')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.unitsService.findOne(req, id);
  }

  @Get()
  @ApiUserFilterQueries()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('perpage') perpage: number,
    @Query('search') search: string = '',
    @Query('searchfields') searchfields: string = '',
    @Query('filter') filter: Record<string, string> = {},
    @Query('sort') sort: string = '',
    @Query('advance') advance: QueryAdvance = null,
  ) {
    const defaultSearchFields: string[] = ['name'];
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

    return this.unitsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UnitCreateDto,
    description: 'UnitCreateDto',
  })
  async create(@Body() createDto: UnitCreateDto, @Req() req: Request) {
    return this.unitsService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UnitUpdateDto,
    @Req() req: Request,
  ) {
    return this.unitsService.update(req, id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return this.unitsService.delete(req, id);
  }
}
