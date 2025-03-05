import { Test, TestingModule } from '@nestjs/testing';
import { SystemCurrencyIsoController } from './system_currency_iso.controller';
import { SystemCurrencyIsoService } from './system_currency_iso.service';

describe('SystemCurrencyIsoController', () => {
  let controller: SystemCurrencyIsoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemCurrencyIsoController],
      providers: [SystemCurrencyIsoService],
    }).compile();

    controller = module.get<SystemCurrencyIsoController>(SystemCurrencyIsoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
