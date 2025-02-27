import { Test, TestingModule } from '@nestjs/testing';
import { SystemClusterService } from './system-cluster.service';

describe('SystemClusterService', () => {
  let service: SystemClusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemClusterService],
    }).compile();

    service = module.get<SystemClusterService>(SystemClusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
