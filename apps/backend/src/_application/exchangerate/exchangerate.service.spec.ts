import { Test, TestingModule } from '@nestjs/testing';
import { ExchangerateService } from './exchangerate.service';

describe('ExchangerateService', () => {
  let service: ExchangerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangerateService],
    }).compile();

    service = module.get<ExchangerateService>(ExchangerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
