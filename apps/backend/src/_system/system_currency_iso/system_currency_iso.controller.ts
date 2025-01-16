import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';

import { Controller, Get, Logger, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SystemCurrencyIsoService } from './system_currency_iso.service';

@Controller('system-api/v1/system-currency-iso')
@ApiTags('system/system-currency-iso')
export class SystemCurrencyIsoController {
  constructor(
    private readonly systemCurrencyIsoService: SystemCurrencyIsoService,
  ) {}

  private readonly logger = new Logger(SystemCurrencyIsoController.name);

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
    const defaultSearchFields: string[] = ['iso_code', 'name', 'symbol'];

    if (!perpage) {
      perpage = 99999;
    }

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
    return this.systemCurrencyIsoService.findAll(req, q);
  }
}
