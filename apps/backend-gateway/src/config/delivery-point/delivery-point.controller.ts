import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DeliveryPointService } from './delivery-point.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/delivery-point')
@ApiTags('Config - Delivery Point')
export class DeliveryPointController {
  constructor(private readonly deliveryPointService: DeliveryPointService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deliveryPointService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.deliveryPointService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.deliveryPointService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.deliveryPointService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deliveryPointService.delete(id);
  }
}
