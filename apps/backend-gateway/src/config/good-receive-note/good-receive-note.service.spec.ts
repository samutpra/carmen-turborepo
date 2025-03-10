import { Test, TestingModule } from '@nestjs/testing';
import { GoodReceiveNoteService } from './good-receive-note.service';

describe('GoodReceiveNoteService', () => {
  let service: GoodReceiveNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodReceiveNoteService],
    }).compile();

    service = module.get<GoodReceiveNoteService>(GoodReceiveNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
