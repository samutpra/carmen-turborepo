import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientManagerService } from './prisma-client-manager.service';

describe('PrismaClientManagerService', () => {
  let service: PrismaClientManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientManagerService],
    }).compile();

    service = module.get<PrismaClientManagerService>(PrismaClientManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
