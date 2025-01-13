import { Module } from '@nestjs/common';

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
