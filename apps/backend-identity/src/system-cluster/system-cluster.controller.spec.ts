import { Test, TestingModule } from '@nestjs/testing';
import { SystemClusterController } from './system-cluster.controller';
import { SystemClusterService } from './system-cluster.service';

describe('SystemClusterController', () => {
  let controller: SystemClusterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemClusterController],
      providers: [SystemClusterService],
    }).compile();

    controller = module.get<SystemClusterController>(SystemClusterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
