import { Test, TestingModule } from '@nestjs/testing';
import { RunningCodeController } from './running-code.controller';
import { RunningCodeService } from './running-code.service';

describe('RunningCodeController', () => {
  let controller: RunningCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunningCodeController],
      providers: [RunningCodeService],
    }).compile();

    controller = module.get<RunningCodeController>(RunningCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
