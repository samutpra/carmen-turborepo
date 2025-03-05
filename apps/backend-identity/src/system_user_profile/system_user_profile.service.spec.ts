import { Test, TestingModule } from '@nestjs/testing';
import { SystemUserProfileService } from './system_user_profile.service';

describe('SystemUserProfileService', () => {
  let service: SystemUserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemUserProfileService],
    }).compile();

    service = module.get<SystemUserProfileService>(SystemUserProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
