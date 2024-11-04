import { Test, TestingModule } from '@nestjs/testing';

import { UserTenantController } from './user-tenant.controller';
import { UserTenantService } from './user-tenant.service';

describe('UserTenantController', () => {
  let controller: UserTenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTenantController],
      providers: [UserTenantService],
    }).compile();

    controller = module.get<UserTenantController>(UserTenantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
