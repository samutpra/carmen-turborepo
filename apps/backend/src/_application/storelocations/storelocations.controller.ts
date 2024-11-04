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
import { StoreLocationsService } from './storelocations.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/tenant';
import {
  StoreLocationCreateDto,
  StoreLocationUpdateDto,
} from './dto/storeLocation.dto';

@Controller('api/v1/storelocations')
@ApiTags('storelocations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StoreLocationsController {
  constructor(private readonly storelocationsService: StoreLocationsService) {}

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request) {
    return this.storelocationsService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.storelocationsService.findAll(req);
  }

  @Post()
  async create(@Body() createDto: StoreLocationCreateDto, @Req() req: Request) {
    return this.storelocationsService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: StoreLocationUpdateDto,
    @Req() req: Request,
  ) {
    return this.storelocationsService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.storelocationsService.delete(req, id);
  }
}
