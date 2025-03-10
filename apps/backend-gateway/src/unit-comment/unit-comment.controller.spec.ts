import { Test, TestingModule } from '@nestjs/testing';
import { UnitCommentController } from './unit-comment.controller';
import { UnitCommentService } from './unit-comment.service';

describe('UnitCommentController', () => {
  let controller: UnitCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitCommentController],
      providers: [UnitCommentService],
    }).compile();

    controller = module.get<UnitCommentController>(UnitCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
