import { Test, TestingModule } from '@nestjs/testing';
import { ProductItemGroupController } from './product-item-group.controller';
import { ProductItemGroupService } from './product-item-group.service';

describe('ProductItemGroupController', () => {
  let controller: ProductItemGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductItemGroupController],
      providers: [ProductItemGroupService],
    }).compile();

    controller = module.get<ProductItemGroupController>(ProductItemGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
