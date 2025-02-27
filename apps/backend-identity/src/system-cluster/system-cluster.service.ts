import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { tb_cluster } from '@prisma/client';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { PrismaService } from 'src/prisma/prisma.service';
import QueryParams from 'lib/types';
import { ClusterCreateDto, ClusterUpdateDto } from 'shared-dtos';
import { DuplicateException } from 'lib/utils/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
@Injectable()
export class SystemClusterService {
  constructor(private prisma: PrismaService) {}

  logger = new Logger(SystemClusterService.name);

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_cluster>> {
    const listObj = await this.prisma.tb_cluster.findMany(q.findMany());
    const max = await this.prisma.tb_cluster.count({
      where: q.where(),
    });

    const res: ResponseList<tb_cluster> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
      },
    };

    return res;
  }

  async findOne(req: Request, id: string) {
    const oneObj = await this.prisma.tb_cluster.findUnique({
      where: { id },
    });

    if (!oneObj) {
      throw new NotFoundException('Cluster not found');
    }

    const res: ResponseSingle<tb_cluster> = {
      data: oneObj,
    };

    return res;
  }

  async create(req: Request, createDto: ClusterCreateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const user_id = user.id;

    const found = await this.prisma.tb_cluster.findUnique({
      where: {
        code: createDto.code,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'cluster already exists',
        id: found.id,
      });
    }

    const cluster_obj = {
      ...createDto,
      created_by_id: user_id,
      created_at: new Date(),
      updated_by_id: user_id,
      updated_at: new Date(),
    };

    this.logger.log({ cluster_obj });

    const createObj = await this.prisma.tb_cluster.create({
      data: cluster_obj,
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(req: Request, id: string, updateDto: ClusterUpdateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const user_id = user.id;

    const oneObj = await this.prisma.tb_cluster.findUnique({
      where: { id },
    });

    if (!oneObj) {
      throw new NotFoundException('Cluster not found');
    }

    if (oneObj.code !== updateDto.code) {
      const found = await this.prisma.tb_cluster.findUnique({
        where: { code: updateDto.code },
      });

      if (found) {
        throw new DuplicateException({
          statusCode: HttpStatus.CONFLICT,
          message: 'cluster already exists',
          id: found.id,
        });
      }
    }

    const updateObj = await this.prisma.tb_cluster.update({
      where: { id },
      data: { ...updateDto, updated_by_id: user_id, updated_at: new Date() },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    // const user_id = '123'; //this.extractReqService.extractUserId(req);

    const oneObj = await this.prisma.tb_cluster.findUnique({
      where: { id },
    });

    if (!oneObj) {
      throw new NotFoundException('Cluster not found');
    }

    const isActiveBUs = await this.prisma.tb_business_unit.count({
      where: {
        cluster_id: id,
      },
    });

    if (isActiveBUs > 0) {
      throw new BadRequestException('Cluster is in use');
    }

    const res = await this.prisma.tb_cluster.delete({
      where: { id },
    });

    return {
      message: 'Cluster deleted successfully',
      id: res.id,
    };
  }
}
