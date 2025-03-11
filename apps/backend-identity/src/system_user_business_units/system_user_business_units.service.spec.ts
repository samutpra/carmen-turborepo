import { Test, TestingModule } from '@nestjs/testing';
import { SystemUserBusinessUnitsService } from './system_user_business_units.service';

describe('SystemUserBusinessUnitsService', () => {
  let service: SystemUserBusinessUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemUserBusinessUnitsService],
    }).compile();

    service = module.get<SystemUserBusinessUnitsService>(SystemUserBusinessUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
