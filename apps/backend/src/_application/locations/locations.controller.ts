import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/tenant';
import { LocationCreateDto, LocationUpdateDto } from 'shared-dtos';

@Controller('api/v1/locations')
@ApiTags('locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request) {
    return this.locationsService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.locationsService.findAll(req);
  }

  @Post()
  async create(@Body() createDto: LocationCreateDto, @Req() req: Request) {
    return this.locationsService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: LocationUpdateDto,
    @Req() req: Request,
  ) {
    return this.locationsService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.locationsService.delete(req, id);
  }
}
