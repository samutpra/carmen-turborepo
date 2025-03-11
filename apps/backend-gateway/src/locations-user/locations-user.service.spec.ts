import { Test, TestingModule } from '@nestjs/testing';
import { LocationsUserService } from './locations-user.service';

describe('LocationsUserService', () => {
  let service: LocationsUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsUserService],
    }).compile();

    service = module.get<LocationsUserService>(LocationsUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
