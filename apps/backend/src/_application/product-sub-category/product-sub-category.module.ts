import { Module } from '@nestjs/common';

import { ProductSubCategoryController } from './product-sub-category.controller';
import { ProductSubCategoryService } from './product-sub-category.service';

@Module({
  controllers: [ProductSubCategoryController],
  providers: [ProductSubCategoryService],
})
export class ProductSubCategoryModule {}
