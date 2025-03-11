import { Module } from '@nestjs/common';
import { ClusterController } from './cluster.controller';
import { ClusterService } from './cluster.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ClusterController],
  providers: [ClusterService, PrismaService],
})
export class ClusterModule {}
