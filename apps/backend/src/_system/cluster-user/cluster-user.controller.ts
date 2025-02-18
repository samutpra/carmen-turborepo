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
import { ClusterUserService } from "./cluster-user.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import QueryParams, { QueryAdvance } from "lib/types";
import { ApiUserFilterQueries } from "lib/decorator/userfilter.decorator";
import {
  ClusterUserCreateDto,
  ClusterUserUpdateDto,
} from "shared-dtos/cluster-user/cluster-user.dto";

@Controller("api/v1/cluster-user")
@ApiTags("cluster-user")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class ClusterUserController {
  constructor(private readonly clusterUserService: ClusterUserService) {}

  private readonly logger = new Logger(ClusterUserController.name);

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async findOne(@Param("id") id: string, @Req() req: Request) {
    this.logger.debug({
      file: ClusterUserController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
    return this.clusterUserService.findOne(req, id);
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
      file: ClusterUserController.name,
      function: this.findAll.name,
    });
    const defaultSearchFields: string[] = ["name", "description"];

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
    return this.clusterUserService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: ClusterUserCreateDto,
    description: "ClusterUserCreateDto",
  })
  async create(@Req() req: Request, @Body() body: ClusterUserCreateDto) {
    this.logger.debug({
      file: ClusterUserController.name,
      function: this.create.name,
      body: body,
    });
    this.logger.debug({ body: body });
    return this.clusterUserService.create(req, body);
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  @ApiBody({
    type: ClusterUserUpdateDto,
    description: "ClusterUserUpdateDto",
  })
  async update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: ClusterUserUpdateDto,
  ) {
    this.logger.debug({
      file: ClusterUserController.name,
      function: this.update.name,
      body: body,
    });
    this.logger.debug({ body: body });
    return this.clusterUserService.update(req, id, body);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async delete(@Param("id") id: string, @Req() req: Request) {
    this.logger.debug({
      file: ClusterUserController.name,
      function: this.delete.name,
    });
    this.logger.debug({ id: id });
    return this.clusterUserService.delete(req, id);
  }
}
