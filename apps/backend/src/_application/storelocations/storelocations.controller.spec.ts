import { Test, TestingModule } from '@nestjs/testing';

import { StoreLocationsController } from './storelocations.controller';
import { StoreLocationsService } from './storelocations.service';

describe('StoreLocationsController', () => {
  let controller: StoreLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreLocationsController],
      providers: [StoreLocationsService],
    }).compile();

    controller = module.get<StoreLocationsController>(StoreLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
