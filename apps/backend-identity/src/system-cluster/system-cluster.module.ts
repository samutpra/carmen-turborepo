import { Module } from '@nestjs/common';
import { SystemClusterService } from './system-cluster.service';
import { SystemClusterController } from './system-cluster.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SystemClusterController],
  providers: [SystemClusterService],
  exports: [SystemClusterService],
})
export class SystemClusterModule {}
