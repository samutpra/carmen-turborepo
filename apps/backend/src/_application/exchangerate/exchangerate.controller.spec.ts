import { Test, TestingModule } from '@nestjs/testing';

import { ExchangerateController } from './exchangerate.controller';
import { ExchangerateService } from './exchangerate.service';

describe('ExchangerateController', () => {
  let controller: ExchangerateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangerateController],
      providers: [ExchangerateService],
    }).compile();

    controller = module.get<ExchangerateController>(ExchangerateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
