import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClusterService } from './cluster.service';
import { tb_cluster } from '@repo/prisma-shared-schema-platform';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { UpdateClusterDto } from './dto/update-cluster.dto';

@Controller()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @MessagePattern('cluster.create')
  async create(
    @Payload() createClusterDto: CreateClusterDto,
  ): Promise<tb_cluster> {
    try {
      return await this.clusterService.create(createClusterDto);
    } catch (error) {
      throw new Error(`Failed to create cluster: ${error.message}`);
    }
  }

  @MessagePattern('cluster.findAll')
  async findAll(): Promise<tb_cluster[]> {
    try {
      return await this.clusterService.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch clusters: ${error.message}`);
    }
  }

  @MessagePattern('cluster.findOne')
  async findOne(@Payload() id: string): Promise<tb_cluster> {
    try {
      return await this.clusterService.findOne(id);
    } catch (error) {
      throw new Error(`Failed to fetch cluster: ${error.message}`);
    }
  }

  @MessagePattern('cluster.update')
  async update(
    @Payload() payload: { id: string; updateClusterDto: UpdateClusterDto },
  ): Promise<tb_cluster> {
    try {
      const { id, updateClusterDto } = payload;
      return await this.clusterService.update(id, updateClusterDto);
    } catch (error) {
      throw new Error(`Failed to update cluster: ${error.message}`);
    }
  }

  @MessagePattern('cluster.remove')
  async remove(@Payload() id: string): Promise<tb_cluster> {
    try {
      return await this.clusterService.remove(id);
    } catch (error) {
      throw new Error(`Failed to remove cluster: ${error.message}`);
    }
  }
}
