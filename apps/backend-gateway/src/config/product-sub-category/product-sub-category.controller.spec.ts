import { Test, TestingModule } from '@nestjs/testing';
import { ProductSubCategoryController } from './product-sub-category.controller';
import { ProductSubCategoryService } from './product-sub-category.service';

describe('ProductSubCategoryController', () => {
  let controller: ProductSubCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSubCategoryController],
      providers: [ProductSubCategoryService],
    }).compile();

    controller = module.get<ProductSubCategoryController>(ProductSubCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
