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
import { RunningCodeService } from "./running-code.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import { ApiUserFilterQueries } from "lib/decorator/userfilter.decorator";
import QueryParams, { QueryAdvance } from "lib/types";
import {
  ConfigRunningCodeCreateDto,
  ConfigRunningCodeUpdateDto,
} from "shared-dtos/config/config-running-code";

/**
 * Controller for managing running code operations.
 */
@Controller("api/v1/config/running-code")
@ApiTags("running-code")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class RunningCodeController {
  constructor(private readonly runningCodeService: RunningCodeService) {}

  private readonly logger = new Logger(RunningCodeController.name);

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async findOne(@Param("id") id: string, @Req() req: Request) {
    this.logger.debug({ id: id });
    return this.runningCodeService.findOne(req, id);
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
      file: RunningCodeController.name,
      function: this.findAll.name,
    });
    const defaultSearchFields: string[] = ["type"];

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
    return this.runningCodeService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ConfigRunningCodeCreateDto,
    description: "ConfigRunningCodeCreateDto",
  })
  async create(@Req() req: Request, @Body() body: ConfigRunningCodeCreateDto) {
    this.logger.debug({
      file: RunningCodeController.name,
      function: this.create.name,
    });
    this.logger.debug({ body: body });
    return this.runningCodeService.create(req, body);
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  @ApiBody({
    type: ConfigRunningCodeUpdateDto,
    description: "ConfigRunningCodeUpdateDto",
  })
  async update(
    @Param("id") id: string,
    @Req() req: Request,
    @Body() body: ConfigRunningCodeUpdateDto,
  ) {
    this.logger.debug({
      file: RunningCodeController.name,
      function: this.update.name,
    });
    this.logger.debug({ id: id, updateDto: body });

    return this.runningCodeService.update(req, id, body);
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
    return this.runningCodeService.delete(req, id);
  }
}
