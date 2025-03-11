import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { tb_cluster } from '@repo/prisma-shared-schema-platform';
import { CreateClusterDto } from './dto/create-cluster.dto';
import { UpdateClusterDto } from './dto/update-cluster.dto';

@Injectable()
export class ClusterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClusterDto: CreateClusterDto): Promise<tb_cluster> {
    return this.prisma.tb_cluster.create({
      data: {
        ...createClusterDto,
      },
    });
  }

  async findAll(): Promise<tb_cluster[]> {
    return this.prisma.tb_cluster.findMany();
  }

  async findOne(id: string): Promise<tb_cluster> {
    const cluster = await this.prisma.tb_cluster.findUnique({
      where: { id },
    });

    if (!cluster) {
      throw new NotFoundException(`Cluster with ID ${id} not found`);
    }

    return cluster;
  }

  async update(
    id: string,
    updateClusterDto: UpdateClusterDto,
  ): Promise<tb_cluster> {
    await this.findOne(id); // Verify existence

    return this.prisma.tb_cluster.update({
      where: { id },
      data: updateClusterDto,
    });
  }

  async remove(id: string): Promise<tb_cluster> {
    await this.findOne(id); // Verify existence

    return this.prisma.tb_cluster.delete({
      where: { id },
    });
  }
}
