import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  Put,
  Body,
  Logger,
} from "@nestjs/common";
import { UserLocationService } from "./user-location.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import { UpdateUserLocationDto } from "shared-dtos/user-location/user-location.dto";

@Controller("api/v1/users/location")
@ApiTags("user-location")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class UserLocationController {
  constructor(private readonly userLocationService: UserLocationService) {}

  private readonly logger = new Logger(UserLocationController.name);

  @Get(":location_id")
  @ApiParam({
    name: "location_id",
    description: "location_id",
    required: true,
    type: "uuid",
  })
  async getUsersByLocationId(
    @Param("location_id") location_id: string,
    @Req() req: Request,
  ) {
    this.logger.debug({ location_id: location_id });
    return this.userLocationService.getUsersByLocationId(req, location_id);
  }

  @Put(":location_id")
  @ApiParam({
    name: "location_id",
    description: "location_id",
    required: true,
    type: "uuid",
  })
  @ApiBody({
    type: UpdateUserLocationDto,
    description: "UpdateUserLocationDto",
  })
  async managerUserLocation(
    @Param("location_id") location_id: string,
    @Body() body: UpdateUserLocationDto,
    @Req() req: Request,
  ) {
    this.logger.debug({ location_id: location_id, body: body });
    return this.userLocationService.managerUserLocation(req, location_id, body);
  }
}
