import { Test, TestingModule } from '@nestjs/testing';
import { SystemBusinessUnitsService } from './system_business_units.service';

describe('SystemBusinessUnitsService', () => {
  let service: SystemBusinessUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemBusinessUnitsService],
    }).compile();

    service = module.get<SystemBusinessUnitsService>(SystemBusinessUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
