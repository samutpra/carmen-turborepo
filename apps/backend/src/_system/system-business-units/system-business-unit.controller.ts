import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  BusinessUnitCreateDto,
  BusinessUnitCreateSchema,
  BusinessUnitUpdateDto,
  BusinessUnitUpdateSchema,
} from '@carmensoftware/shared-dtos';
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

import { SystemBusinessUnitService } from './system-business-unit.service';

@Controller("system-api/v1/business-units")
@ApiTags("system/business-unit")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class SystemBusinessUnitController {
  constructor(
    private readonly systemBusinessUnitService: SystemBusinessUnitService,
  ) {}

  private readonly logger = new Logger(SystemBusinessUnitController.name);

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async findOne(@Param("id") id: string, @Req() req: Request) {
    this.logger.log({ id: id });
    return this.systemBusinessUnitService.findOne(req, id);
  }

  @Get()
  @ApiUserFilterQueries()
  async findAll(
    @Req() req: Request,
    @Query("page") page?: number,
    @Query("perpage") perpage?: number,
    @Query("search") search?: string,
    @Query("searchfields") searchfields?: string,
    @Query("filter") filter?: Record<string, string>,
    @Query("sort") sort?: string,
    @Query("advance") advance?: QueryAdvance,
  ) {
    const defaultSearchFields: string[] = ["code", "name"];

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
    return this.systemBusinessUnitService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: BusinessUnitCreateDto,
    description: "BusinessUnitCreateDto",
  })
  @UsePipes(new ZodValidationPipe(BusinessUnitCreateSchema))
  async create(@Body() createDto: BusinessUnitCreateDto, @Req() req: Request) {
    this.logger.log({ createDto });
    const parseObj = BusinessUnitCreateSchema.safeParse(createDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }

    this.logger.log({ parseObj });
    return this.systemBusinessUnitService.create(req, createDto);
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  @ApiBody({
    type: BusinessUnitUpdateDto,
    description: "BusinessUnitUpdateDto",
  })
  async update(
    @Param("id") id: string,
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
    return this.systemBusinessUnitService.update(req, id, updatedto);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async delete(@Param("id") id: string, @Req() req: Request) {
    this.logger.log({ id });
    return this.systemBusinessUnitService.delete(req, id);
  }
}
