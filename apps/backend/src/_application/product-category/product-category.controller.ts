import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ProductCategoryCreateDto,
  ProductCategoryUpdateDto,
} from 'shared-dtos';
import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';

import { ApiTags } from '@nestjs/swagger';
import { ProductCategory } from '@prisma-carmen-client-tenant';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ProductCategoryService } from './product-category.service';

@Controller('api/v1/product-category')
@ApiTags('product-category')
@UseGuards(JwtAuthGuard)
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get(':id')
  async fineOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<ProductCategory>> {
    return this.productCategoryService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.productCategoryService.findAll(req);
  }

  @Post()
  async create(
    @Body() createDto: ProductCategoryCreateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productCategoryService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: ProductCategoryUpdateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productCategoryService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.productCategoryService.delete(req, id);
  }
}
