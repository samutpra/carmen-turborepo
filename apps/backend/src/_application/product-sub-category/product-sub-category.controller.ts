import { Controller } from '@nestjs/common';
import { ProductSubCategoryService } from './product-sub-category.service';

@Controller('product-sub-category')
export class ProductSubCategoryController {
  constructor(private readonly productSubCategoryService: ProductSubCategoryService) {}
}
