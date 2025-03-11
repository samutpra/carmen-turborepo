import { Test, TestingModule } from '@nestjs/testing';
import { SystemCurrencyIsoService } from './system_currency_iso.service';

describe('SystemCurrencyIsoService', () => {
  let service: SystemCurrencyIsoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemCurrencyIsoService],
    }).compile();

    service = module.get<SystemCurrencyIsoService>(SystemCurrencyIsoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
