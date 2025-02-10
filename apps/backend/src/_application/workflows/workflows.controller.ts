import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { WorkflowsService } from "./workflows.service";
import { ApiBearerAuth, ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import { ApiUserFilterQueries } from "lib/decorator/userfilter.decorator";
import { QueryAdvance } from "lib/types";

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

  //   @Get(":id")
  //   @ApiParam({
  //     name: "id",
  //     description: "id",
  //     required: true,
  //     type: "uuid",
  //   })
  //   async findOne(@Param("id") id: string, @Req() req: Request) {
  //     this.logger.debug({
  //       file: WorkflowsController.name,
  //       function: this.findOne.name,
  //     });
  //   }

  //   @Get()
  //   @ApiUserFilterQueries()
  //   async findAll(
  //     @Req() req: Request,
  //     @Query("page") page?: number,
  //     @Query("perpage") perpage?: number,
  //     @Query("search") search?: string,
  //     @Query("searchfields") searchfields?: string,
  //     @Query("filter") filter?: Record<string, string>,
  //     @Query("sort") sort?: string,
  //     @Query("advance") advance?: QueryAdvance,
  //   ) {
  //     this.logger.debug({
  //       file: WorkflowsController.name,
  //       function: this.findAll.name,
  //     });
  //   }
}
