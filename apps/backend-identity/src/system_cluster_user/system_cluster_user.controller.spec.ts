import { Test, TestingModule } from '@nestjs/testing';
import { SystemClusterUserController } from './system_cluster_user.controller';
import { SystemClusterUserService } from './system_cluster_user.service';

describe('SystemClusterUserController', () => {
  let controller: SystemClusterUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemClusterUserController],
      providers: [SystemClusterUserService],
    }).compile();

    controller = module.get<SystemClusterUserController>(SystemClusterUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
