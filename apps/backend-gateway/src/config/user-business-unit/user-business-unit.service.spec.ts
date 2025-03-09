import { Test, TestingModule } from '@nestjs/testing';
import { UserBusinessUnitService } from './user-business-unit.service';

describe('UserBusinessUnitService', () => {
  let service: UserBusinessUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBusinessUnitService],
    }).compile();

    service = module.get<UserBusinessUnitService>(UserBusinessUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
