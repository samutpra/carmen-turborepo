import { Module, ValidationPipe } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { ClusterController } from './cluster.controller';
import { ClusterService } from './cluster.service';

@Module({
  controllers: [ClusterController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true,
    //   }),
    // },
    ClusterService,
  ],
})
export class ClusterModule {}
