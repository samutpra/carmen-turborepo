import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  Body,
  Put,
  Logger,
} from '@nestjs/common';
import { LocationsUserService } from './locations-user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { UpdateLocationUserDto } from 'shared-dtos/locations-user/locations-user.dto';

@Controller('api/v1/locations/user')
@ApiTags('locations-user')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class LocationsUserController {
  constructor(private readonly locationsUserService: LocationsUserService) {}

  private readonly logger = new Logger(LocationsUserController.name);

  @Get(':user_id')
  @ApiParam({
    name: 'user_id',
    description: 'user_id',
    required: true,
    type: 'uuid',
  })
  async getLocationsByUserId(
    @Param('user_id') user_id: string,
    @Req() req: Request,
  ) {
    this.logger.debug({ user_id: user_id });
    return this.locationsUserService.getLocationsByUserId(req, user_id);
  }

  @Put(':user_id')
  @ApiParam({
    name: 'user_id',
    description: 'user_id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: UpdateLocationUserDto,
    description: 'UpdateLocationUserDto',
  })
  async managerLocationUser(
    @Param('user_id') user_id: string,
    @Body() body: UpdateLocationUserDto,
    @Req() req: Request,
  ) {
    this.logger.debug({ user_id: user_id, body: body });
    return this.locationsUserService.managerLocationUser(req, user_id, body);
  }
}
