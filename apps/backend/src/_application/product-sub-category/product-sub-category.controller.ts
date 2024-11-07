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
import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';
import {
  ProductSubCategoryCreateDto,
  ProductSubCategoryUpdateDto,
} from '@carmensoftware/shared-dtos';

import { ApiTags } from '@nestjs/swagger';
import { ProductSubCategory } from '@prisma-carmen-client-tenant';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ProductSubCategoryService } from './product-sub-category.service';

@Controller('api/v1/product-sub-category')
@ApiTags('Product Sub category')
@UseGuards(JwtAuthGuard)
export class ProductSubCategoryController {
  constructor(
    private readonly productSubCategoryService: ProductSubCategoryService,
  ) {}

  @Get(':id')
  async fineOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<ProductSubCategory>> {
    return this.productSubCategoryService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.productSubCategoryService.findAll(req);
  }

  @Post()
  async create(
    @Body() createDto: ProductSubCategoryCreateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productSubCategoryService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: ProductSubCategoryUpdateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productSubCategoryService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.productSubCategoryService.delete(req, id);
  }
}
