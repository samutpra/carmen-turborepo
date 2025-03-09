import { Test, TestingModule } from '@nestjs/testing';
import { GoodReceiveNoteController } from './good-receive-note.controller';
import { GoodReceiveNoteService } from './good-receive-note.service';

describe('GoodReceiveNoteController', () => {
  let controller: GoodReceiveNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodReceiveNoteController],
      providers: [GoodReceiveNoteService],
    }).compile();

    controller = module.get<GoodReceiveNoteController>(GoodReceiveNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
