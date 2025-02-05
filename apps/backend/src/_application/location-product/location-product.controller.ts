import {
  Controller,
  Get,
  Req,
  UseGuards,
  Logger,
  Param,
  Query,
} from "@nestjs/common";
import { LocationProductService } from "./location-product.service";
import { ApiBearerAuth, ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import QueryParams from "lib/types";

@ApiTags("location-product")
@Controller("api/v1/location-product")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class LocationProductController {
  constructor(
    private readonly locationProductService: LocationProductService,
  ) {}

  private readonly logger = new Logger(LocationProductController.name);

  @Get(":id")
  @ApiParam({
    name: "id",
    description: "id",
    required: true,
    type: "uuid",
  })
  async getProductsByLocationId(
    @Req() req: Request,
    @Param("id") id: string,
    @Query("page") page?: number,
    @Query("perpage") perpage?: number,
    @Query("search") search?: string,
  ) {
    this.logger.debug({
      file: LocationProductController.name,
      function: this.getProductsByLocationId.name,
    });

    this.logger.debug({
      id: id,
      page: page,
      perpage: perpage,
      search: search,
    });

    const q = new QueryParams(page, perpage, search);

    this.logger.debug({ q: q });

    return this.locationProductService.getProductsByLocationId(req, id, q);
  }
}
