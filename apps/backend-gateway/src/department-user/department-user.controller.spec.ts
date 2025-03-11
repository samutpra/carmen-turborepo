import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentUserController } from './department-user.controller';
import { DepartmentUserService } from './department-user.service';

describe('DepartmentUserController', () => {
  let controller: DepartmentUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentUserController],
      providers: [DepartmentUserService],
    }).compile();

    controller = module.get<DepartmentUserController>(DepartmentUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
