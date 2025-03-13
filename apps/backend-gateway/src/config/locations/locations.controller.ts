import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/locations')
@ApiTags('Config - Locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  private readonly logger = new Logger(LocationsController.name);

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.debug({ id: id });
    // return this.locationsService.findOne(id);
  }

  @Get()
  async findAll() {
    this.logger.debug({});
    // return this.locationsService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    this.logger.debug({ createDto: createDto });
    // return this.locationsService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    this.logger.debug({ id: id, updateDto: updateDto });
    // return this.locationsService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.debug({ id: id });
    // return this.locationsService.delete(id);
  }
}
