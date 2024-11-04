import { Test, TestingModule } from '@nestjs/testing';
import { ExtractReqService } from './extract-req.service';

describe('ExtractReqService', () => {
  let service: ExtractReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractReqService],
    }).compile();

    service = module.get<ExtractReqService>(ExtractReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
