import { Test, TestingModule } from '@nestjs/testing';
import { ProductLocationController } from './product-location.controller';
import { ProductLocationService } from './product-location.service';

describe('ProductLocationController', () => {
  let controller: ProductLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLocationController],
      providers: [ProductLocationService],
    }).compile();

    controller = module.get<ProductLocationController>(ProductLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
