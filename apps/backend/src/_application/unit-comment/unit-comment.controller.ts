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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import QueryParams, { QueryAdvance } from "lib/types";
import { UnitCommentService } from "./unit-comment.service";
import { UnitCommentCreateDto, UnitCommentUpdateDto } from "shared-dtos";
import { ApiUserFilterQueries } from "lib/decorator/userfilter.decorator";

@Controller("api/v1/unit-comment")
@ApiTags("unit-comment")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class UnitCommentController {
  constructor(private readonly unitCommentService: UnitCommentService) {}

  private readonly logger = new Logger(UnitCommentController.name);

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async findOne(@Param("id") id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.unitCommentService.findOne(req, id);
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
    this.logger.debug({
      file: UnitCommentController.name,
      function: this.findAll.name,
    });
    const defaultSearchFields: string[] = ["message"];

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
    return this.unitCommentService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UnitCommentCreateDto,
    description: "UnitCommentCreateDto",
  })
  async create(@Req() req: Request, @Body() body: UnitCommentCreateDto) {
    this.logger.debug({
      file: UnitCommentController.name,
      function: this.create.name,
    });
    this.logger.debug({ body: body });
    return this.unitCommentService.create(req, body);
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  @ApiBody({
    type: UnitCommentUpdateDto,
    description: "UnitCommentUpdateDto",
  })
  async update(
    @Param("id") id: string,
    @Req() req: Request,
    @Body() body: any,
  ) {
    this.logger.debug({
      file: UnitCommentController.name,
      function: this.update.name,
    });
    this.logger.debug({ id: id, updateDto: body });

    return this.unitCommentService.update(req, id, body);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async delete(@Param("id") id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.unitCommentService.delete(req, id);
  }
}
