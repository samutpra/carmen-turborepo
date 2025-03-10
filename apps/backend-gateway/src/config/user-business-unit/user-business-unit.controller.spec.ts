import { Test, TestingModule } from '@nestjs/testing';
import { UserBusinessUnitController } from './user-business-unit.controller';
import { UserBusinessUnitService } from './user-business-unit.service';

describe('UserBusinessUnitController', () => {
  let controller: UserBusinessUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBusinessUnitController],
      providers: [UserBusinessUnitService],
    }).compile();

    controller = module.get<UserBusinessUnitController>(UserBusinessUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
