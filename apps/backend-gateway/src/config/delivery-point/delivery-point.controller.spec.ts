import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPointController } from './delivery-point.controller';
import { DeliveryPointService } from './delivery-point.service';

describe('DeliveryPointController', () => {
  let controller: DeliveryPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPointController],
      providers: [DeliveryPointService],
    }).compile();

    controller = module.get<DeliveryPointController>(DeliveryPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
