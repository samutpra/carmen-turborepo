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
  Logger,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import {
  CurrencyCreateDto,
  CurrencyUpdateDto,
} from '@carmensoftware/shared-dtos';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';

@Controller('api/v1/currencies')
@ApiTags('currencies')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  private readonly logger = new Logger(CurrenciesController.name);

  //#region GET ONE
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.currenciesService.findOne(req, id);
  }
  //#endregion GET ONE

  //#region GET ALL
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
    const defaultSearchFields: string[] = [
      'name',
      'code',
      'symbol',
      'description',
    ];

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
    return this.currenciesService.findAll(req, q);
  }
  //#endregion GET ALL

  //#region CREATE
  @Post()
  @ApiBody({
    type: CurrencyCreateDto,
    description: 'CurrencyCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    return this.currenciesService.create(req, createDto);
  }
  //#endregion CREATE

  //#region UPDATE
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: CurrencyUpdateDto,
    description: 'CurrencyUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    return this.currenciesService.update(req, id, updateDto);
  }
  //#endregion UPDATE

  //#region DELETE
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.currenciesService.delete(req, id);
  }
  //#endregion DELETE
}
