import { Test, TestingModule } from '@nestjs/testing';
import { ExtractReqController } from './extract-req.controller';
import { ExtractReqService } from './extract-req.service';

describe('ExtractReqController', () => {
  let controller: ExtractReqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtractReqController],
      providers: [ExtractReqService],
    }).compile();

    controller = module.get<ExtractReqController>(ExtractReqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
