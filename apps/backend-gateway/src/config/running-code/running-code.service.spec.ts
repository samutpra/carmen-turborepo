import { Test, TestingModule } from '@nestjs/testing';
import { RunningCodeService } from './running-code.service';

describe('RunningCodeService', () => {
  let service: RunningCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunningCodeService],
    }).compile();

    service = module.get<RunningCodeService>(RunningCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
