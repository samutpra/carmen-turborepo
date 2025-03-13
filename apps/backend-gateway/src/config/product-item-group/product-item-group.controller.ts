import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductItemGroupService } from './product-item-group.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/product-item-group')
@ApiTags('Config - Product Item Group')
export class ProductItemGroupController {
  constructor(
    private readonly productItemGroupService: ProductItemGroupService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productItemGroupService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.productItemGroupService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.productItemGroupService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.productItemGroupService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productItemGroupService.delete(id);
  }
}
