import { Test, TestingModule } from '@nestjs/testing';
import { LocationProductController } from './location-product.controller';
import { LocationProductService } from './location-product.service';

describe('LocationProductController', () => {
  let controller: LocationProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationProductController],
      providers: [LocationProductService],
    }).compile();

    controller = module.get<LocationProductController>(LocationProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
