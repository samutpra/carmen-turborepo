import { Test, TestingModule } from '@nestjs/testing';
import { SystemUserProfileController } from './system_user_profile.controller';
import { SystemUserProfileService } from './system_user_profile.service';

describe('SystemUserProfileController', () => {
  let controller: SystemUserProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemUserProfileController],
      providers: [SystemUserProfileService],
    }).compile();

    controller = module.get<SystemUserProfileController>(SystemUserProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
