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
import { WorkflowsService } from "./workflows.service";
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
  WorkflowCreateDto,
  workflowDTO,
  workflowUpdateDTO,
  WorkflowUpdateDto,
} from "shared-dtos/workflows/workflows.dto";

@Controller("api/v1/workflows")
@ApiTags("workflows")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  private readonly logger = new Logger(WorkflowsController.name);

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async findOne(@Param("id") id: string, @Req() req: Request) {
    this.logger.debug({
      file: WorkflowsController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
    return this.workflowsService.findOne(req, id);
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
      file: WorkflowsController.name,
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
    return this.workflowsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: workflowDTO,
    description: "WorkflowCreateDto",
  })
  async create(@Req() req: Request, @Body() body: workflowDTO) {
    this.logger.debug({
      file: WorkflowsController.name,
      function: this.create.name,
      body: body,
    });
    this.logger.debug({ body: body });
    return this.workflowsService.create(req, body);
  }

  @Patch(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  @ApiBody({
    type: workflowUpdateDTO,
    description: "WorkflowUpdateDto",
  })
  async update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() body: workflowUpdateDTO,
  ) {
    this.logger.debug({
      file: WorkflowsController.name,
      function: this.update.name,
      body: body,
    });
    this.logger.debug({ body: body });

    const { ...updateDto } = body;
    // updateDto.id = id;
    this.logger.debug({ id: id, updateDto: updateDto });
    return this.workflowsService.update(req, id, body);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async delete(@Req() req: Request, @Param("id") id: string) {
    this.logger.debug({
      file: WorkflowsController.name,
      function: this.delete.name,
    });
    this.logger.debug({ id: id });
    return this.workflowsService.delete(req, id);
  }
}
