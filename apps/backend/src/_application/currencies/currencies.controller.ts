import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import {
  CurrencyCreateDto,
  CurrencyCreateDtoList,
  CurrencyUpdateDto,
} from 'shared-dtos';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

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
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CurrenciesService } from './currencies.service';

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
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
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
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.findAll.name,
    });
    const defaultSearchFields: string[] = [
      'name',
      'code',
      'symbol',
      'description',
    ];

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
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.create.name,
    });
    this.logger.debug({ createDto: createDto });
    return this.currenciesService.create(req, createDto);
  }
  //#endregion CREATE

  //#region CREATE
  @Post('/batch')
  @ApiBody({
    type: CurrencyCreateDtoList,
    description: 'CurrencyCreateDto',
  })
  async createBatch(@Body() createDtoList: any, @Req() req: Request) {
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.create.name,
    });
    this.logger.debug({ createDto: createDtoList });
    return this.currenciesService.createBatch(req, createDtoList);
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
    const { ...updatedto } = updateDto;
    updatedto.id = id;
    this.logger.debug({ id: id, updatedto: updatedto });
    return this.currenciesService.update(req, id, updatedto);
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
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.delete.name,
    });
    this.logger.debug({ id: id });
    return this.currenciesService.delete(req, id);
  }
  //#endregion DELETE
}
