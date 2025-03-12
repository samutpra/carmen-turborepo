import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/product-category')
@ApiTags('Config - Product Category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.productCategoryService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.productCategoryService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.productCategoryService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productCategoryService.delete(id);
  }
}
