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
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/products')
@ApiTags('Config - Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private logger = new Logger(ProductsController.name);

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
    // return this.productsService.findOne(id);
  }

  @Get()
  async findAll() {
    this.logger.debug({
      file: ProductsController.name,
      function: this.findAll.name,
    });
    // return this.productsService.findAll();
  }

  @Get('by-item-group-id/:id')
  async getByItemsGroup(@Param('id') id: string) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.getByItemsGroup.name,
    });
    // return this.productsService.getByItemsGroup(id);
  }

  @Get('order-unit/:id')
  async getOrderUnitByProductId(@Param('id') id: string) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.getOrderUnitByProductId.name,
    });
    // return this.productsService.getOrderUnitByProductId(id);
  }

  @Get('ingredient-unit/:id')
  async getIngredientUnitByProductId(@Param('id') id: string) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.getIngredientUnitByProductId.name,
    });
    // return this.productsService.getIngredientUnitByProductId(id);
  }

  @Post('')
  async create(@Body() createDto: any) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.create.name,
    });
    // return this.productsService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.update.name,
    });
    // return this.productsService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.debug({
      file: ProductsController.name,
      function: this.delete.name,
    });
    // return this.productsService.delete(id);
  }
}
