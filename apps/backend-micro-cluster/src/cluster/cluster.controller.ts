import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClusterService } from './cluster.service';
import { tb_cluster } from '@repo/prisma-shared-schema-platform';

@Controller()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @MessagePattern('findAllCluster')
  async findAll(): Promise<tb_cluster[]> {
    return await this.clusterService.findAll();
  }
}
