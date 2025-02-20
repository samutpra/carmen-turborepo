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
import { UserBusinessUnitService } from "./user-business-unit.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/_lib/auth/guards/jwt.guard";
import QueryParams, { QueryAdvance } from "lib/types";
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from "shared-dtos/user-business-unit.dto";

@Controller("api/v1/user/business-unit")
@ApiTags("user-business-unit")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class UserBusinessUnitController {
  constructor(
    private readonly userBusinessUnitService: UserBusinessUnitService,
  ) {}

  private readonly logger = new Logger(UserBusinessUnitController.name);

  @Get()
  async findOne(@Req() req: Request) {
    return this.userBusinessUnitService.findOne(req);
  }
}
