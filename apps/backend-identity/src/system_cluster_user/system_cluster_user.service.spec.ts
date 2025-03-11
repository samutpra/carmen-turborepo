import { Test, TestingModule } from '@nestjs/testing';
import { SystemClusterUserService } from './system_cluster_user.service';

describe('SystemClusterUserService', () => {
  let service: SystemClusterUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemClusterUserService],
    }).compile();

    service = module.get<SystemClusterUserService>(SystemClusterUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
