import { Test, TestingModule } from '@nestjs/testing';
import { ProductItemGroupService } from './product-item-group.service';

describe('ProductItemGroupService', () => {
  let service: ProductItemGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductItemGroupService],
    }).compile();

    service = module.get<ProductItemGroupService>(ProductItemGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
