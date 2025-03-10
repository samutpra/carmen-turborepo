import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPointService } from './delivery-point.service';

describe('DeliveryPointService', () => {
  let service: DeliveryPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryPointService],
    }).compile();

    service = module.get<DeliveryPointService>(DeliveryPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
