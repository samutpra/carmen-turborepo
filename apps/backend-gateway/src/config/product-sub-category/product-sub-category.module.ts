import { Module } from '@nestjs/common';
import { ProductSubCategoryService } from './product-sub-category.service';
import { ProductSubCategoryController } from './product-sub-category.controller';

@Module({
  controllers: [ProductSubCategoryController],
  providers: [ProductSubCategoryService],
})
export class ProductSubCategoryModule {}
