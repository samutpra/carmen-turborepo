import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/prisma-shared-schema-platform';
import { tb_cluster } from '@repo/prisma-shared-schema-platform';
@Injectable()
export class ClusterService {
  async findAll(): Promise<tb_cluster[]> {
    const clusters = await prisma.tb_cluster.findMany();
    return clusters;
  }
}
