import { Test, TestingModule } from '@nestjs/testing';
import { UnitCommentService } from './unit-comment.service';

describe('UnitCommentService', () => {
  let service: UnitCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitCommentService],
    }).compile();

    service = module.get<UnitCommentService>(UnitCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
