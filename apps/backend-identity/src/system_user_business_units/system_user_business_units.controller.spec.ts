import { Test, TestingModule } from '@nestjs/testing';
import { SystemUserBusinessUnitsController } from './system_user_business_units.controller';
import { SystemUserBusinessUnitsService } from './system_user_business_units.service';

describe('SystemUserBusinessUnitsController', () => {
  let controller: SystemUserBusinessUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemUserBusinessUnitsController],
      providers: [SystemUserBusinessUnitsService],
    }).compile();

    controller = module.get<SystemUserBusinessUnitsController>(SystemUserBusinessUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
