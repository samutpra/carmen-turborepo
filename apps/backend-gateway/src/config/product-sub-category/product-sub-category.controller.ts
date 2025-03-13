import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductSubCategoryService } from './product-sub-category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/product-sub-category')
@ApiTags('Config - Product Sub Category')
export class ProductSubCategoryController {
  constructor(
    private readonly productSubCategoryService: ProductSubCategoryService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productSubCategoryService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.productSubCategoryService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.productSubCategoryService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.productSubCategoryService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productSubCategoryService.delete(id);
  }
}
