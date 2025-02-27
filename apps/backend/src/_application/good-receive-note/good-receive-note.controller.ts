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

import { GoodReceiveNoteService } from './good-receive-note.service';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import {
  GoodReceiveNoteCreateDto,
  GoodReceiveNoteUpdateDto,
} from 'shared-dtos/good-receive-note.dto';

@Controller('api/v1/good-receive-note')
@ApiTags('department')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class GoodReceiveNoteController {
  constructor(
    private readonly goodReceiveNoteService: GoodReceiveNoteService,
  ) {}

  private readonly logger = new Logger(GoodReceiveNoteController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async fineOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.goodReceiveNoteService.findOne(req, id);
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
    const defaultSearchFields: string[] = ['name', 'description'];

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
    return this.goodReceiveNoteService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: GoodReceiveNoteCreateDto,
    description: 'GoodReceiveNoteCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    this.logger.debug({ createDto: createDto });
    return this.goodReceiveNoteService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: GoodReceiveNoteUpdateDto,
    description: 'GoodReceiveNoteUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    const { ...updatedto } = updateDto;
    updatedto.id = id;
    this.logger.debug({ updatedto: updatedto });
    return this.goodReceiveNoteService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.goodReceiveNoteService.delete(req, id);
  }
}
