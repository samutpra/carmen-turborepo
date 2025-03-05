import { Test, TestingModule } from '@nestjs/testing';
import { SystemBusinessUnitsController } from './system_business_units.controller';
import { SystemBusinessUnitsService } from './system_business_units.service';

describe('SystemBusinessUnitsController', () => {
  let controller: SystemBusinessUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemBusinessUnitsController],
      providers: [SystemBusinessUnitsService],
    }).compile();

    controller = module.get<SystemBusinessUnitsController>(SystemBusinessUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
