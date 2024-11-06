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
import { ProductItemGroupService } from './product-item-group.service';
import {
  ProductItemGroupCreateDto,
  ProductItemGroupUpdateDto,
} from 'shared-dtos';

import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';

import { ApiTags } from '@nestjs/swagger';
import { ProductItemGroup } from '@prisma-carmen-client-tenant';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

@Controller('api/v1/product-item-group')
@ApiTags('product-item-group')
@UseGuards(JwtAuthGuard)
export class ProductItemGroupController {
  constructor(
    private readonly productItemGroupService: ProductItemGroupService,
  ) {}

  @Get(':id')
  async fineOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<ProductItemGroup>> {
    return this.productItemGroupService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.productItemGroupService.findAll(req);
  }

  @Post()
  async create(
    @Body() createDto: ProductItemGroupCreateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productItemGroupService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: ProductItemGroupUpdateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.productItemGroupService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.productItemGroupService.delete(req, id);
  }
}
