import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/vendors')
@ApiTags('Config - Vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.vendorsService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.vendorsService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.vendorsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vendorsService.delete(id);
  }
}
