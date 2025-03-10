import { Test, TestingModule } from '@nestjs/testing';
import { LocationsUserController } from './locations-user.controller';
import { LocationsUserService } from './locations-user.service';

describe('LocationsUserController', () => {
  let controller: LocationsUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsUserController],
      providers: [LocationsUserService],
    }).compile();

    controller = module.get<LocationsUserController>(LocationsUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
