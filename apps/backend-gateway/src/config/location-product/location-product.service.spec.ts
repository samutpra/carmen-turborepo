import { Test, TestingModule } from '@nestjs/testing';
import { LocationProductService } from './location-product.service';

describe('LocationProductService', () => {
  let service: LocationProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationProductService],
    }).compile();

    service = module.get<LocationProductService>(LocationProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
