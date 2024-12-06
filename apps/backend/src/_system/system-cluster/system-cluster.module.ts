import { Module, ValidationPipe } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { SystemClusterController } from './system-cluster.controller';
import { SystemClusterService } from './system-cluster.service';

@Module({
  controllers: [SystemClusterController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true,
    //   }),
    // },
    SystemClusterService,
  ],
})
export class SystemClusterModule {}
