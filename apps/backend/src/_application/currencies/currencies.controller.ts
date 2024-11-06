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
  ValidationPipe,
  Query,
  Logger,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

import { ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Currency } from '@prisma-carmen-client-tenant';
import { CurrencyCreateDto, CurrencyUpdateDto } from 'shared-dtos';

@Controller('api/v1/currencies')
@ApiTags('currencies')
@ApiBearerAuth()
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
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<Currency>> {
    return this.currenciesService.findOne(req, id);
  }
  //#endregion GET ONE

  //#region GET ALL
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('perpage') perpage: number,
    @Query('search') search: string = '',
    @Query('filter') filter: Record<string, string> = {},
  ): Promise<ResponseList<Currency>> {
    if (!page) page = 1;
    if (!perpage) perpage = 10;
    page = parseInt(page.toString());
    perpage = parseInt(perpage.toString());
    return this.currenciesService.findAll(req, page, perpage, search, filter);
  }
  //#endregion GET ALL

  //#region CREATE
  @Post()
  async create(
    @Body() createDto: any,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    this.logger.log('createDto: ', createDto);
    return this.currenciesService.create(req, createDto);
  }
  //#endregion CREATE

  //#region UPDATE
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.currenciesService.update(req, id, updateDto);
  }
  //#endregion UPDATE

  //#region DELETE
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.currenciesService.delete(req, id);
  }
  //#endregion DELETE
}
