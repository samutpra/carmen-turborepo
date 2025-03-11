import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { tb_cluster_user } from '@prisma/client';
import { ResponseSingle, ResponseList, ResponseId } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import {
  ClusterUserCreateDto,
  ClusterUserUpdateDto,
} from 'shared-dtos/cluster-user/cluster-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SystemClusterUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(SystemClusterUserService.name);

  async _getById(id: string) {
    const res = await this.prismaService.tb_cluster_user.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        is_active: true,
        tb_cluster: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return res;
  }

  async findOne(req: Request, id: string) {
    const oneObj = await this._getById(id);
    if (!oneObj) {
      throw new NotFoundException('Cluster user not found');
    }
    const res: ResponseSingle<any> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request, q: QueryParams) {
    const max = await this.prismaService.tb_cluster_user.count({
      where: q.where(),
    });

    const q_include = {
      ...q.findMany(),
      select: {
        id: true,
        user_id: true,
        is_active: true,
        tb_cluster: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    };

    const listObj =
      await this.prismaService.tb_cluster_user.findMany(q_include);
    const res: ResponseList<tb_cluster_user> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  async create(req: Request, createDto: ClusterUserCreateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found_user = await this.prismaService.tb_user.findUnique({
      where: {
        id: createDto.user_id,
      },
    });

    if (!found_user) {
      throw new NotFoundException('User not found');
    }

    const found_cluster = await this.prismaService.tb_cluster.findUnique({
      where: {
        id: createDto.cluster_id,
      },
    });

    if (!found_cluster) {
      throw new NotFoundException('Cluster not found');
    }

    const found = await this.prismaService.tb_cluster_user.findUnique({
      where: {
        user_id_cluster_id: {
          user_id: createDto.user_id,
          cluster_id: createDto.cluster_id,
        },
      },
    });

    if (found) {
      throw new DuplicateException({
        message: 'Cluster user already exists',
        id: found.id,
      });
    }

    const createObj = await this.prismaService.tb_cluster_user.create({
      data: {
        user_id: createDto.user_id,
        cluster_id: createDto.cluster_id,
        created_by_id: current_user_id,
        created_at: new Date(),
        updated_by_id: current_user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(req: Request, id: string, updateDto: ClusterUserUpdateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found = await this._getById(id);

    if (!found) {
      throw new NotFoundException('Cluster user not found');
    }

    if (updateDto.user_id) {
      const found_user = await this.prismaService.tb_user.findUnique({
        where: {
          id: updateDto.user_id,
        },
      });

      if (!found_user) {
        throw new NotFoundException('User not found');
      }
    }

    if (updateDto.cluster_id) {
      const found_cluster = await this.prismaService.tb_cluster.findUnique({
        where: {
          id: updateDto.cluster_id,
        },
      });

      if (!found_cluster) {
        throw new NotFoundException('Cluster not found');
      }
    }

    const updateObj = await this.prismaService.tb_cluster_user.update({
      where: {
        id: id,
      },
      data: {
        ...updateDto,
        updated_by_id: current_user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    // const jwt = req.headers['authorization'].split(' ')[1];
    // const supabase = this.supabaseService.SupabaseClient();
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser(jwt);

    // const current_user_id = user.id;

    const found = await this._getById(id);

    if (!found) {
      throw new NotFoundException('Cluster user not found');
    }

    await this.prismaService.tb_cluster_user.delete({
      where: {
        id: id,
      },
    });

    const res: ResponseId<string> = {
      id: id,
    };

    return res;
  }
}
