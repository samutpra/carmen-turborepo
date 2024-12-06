import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  ClusterCreateDto,
  ClusterUpdateDto,
} from '@carmensoftware/shared-dtos';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  cluster_table,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client-system';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class SystemClusterService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemClusterService.name);

  async _getById(db_System: dbSystem, id: string): Promise<cluster_table> {
    const res = await db_System.cluster_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<cluster_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Cluster not found');
    }
    const res: ResponseSingle<cluster_table> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<cluster_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.cluster_table.count({
      where: q.where(),
    });

    const listObj = await this.db_System.cluster_table.findMany(q.findMany());

    const res: ResponseList<cluster_table> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perPage: q.perPage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perPage),
      },
    };
    return res;
  }

  async create(
    req: Request,
    createDto: ClusterCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const found = await this.db_System.cluster_table.findUnique({
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

    const createObj = await this.db_System.cluster_table.create({
      data: {
        ...createDto,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateDto: ClusterUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Cluster not found');
    }

    if (oneObj.code !== updateDto.code) {
      const found = await this.db_System.cluster_table.findUnique({
        where: {
          code: updateDto.code,
        },
      });
      if (found) {
        throw new DuplicateException({
          statusCode: HttpStatus.CONFLICT,
          message: `cluster [code : ${updateDto.code}] already exists`,
          id: found.id,
        });
      }
    }

    const updateObj = await this.db_System.cluster_table.update({
      where: {
        id: id,
      },
      data: { ...updateDto, updated_by_id: user_id, updated_at: new Date() },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Cluster not found');
    }

    const isActiveBUs = await this.db_System.business_unit_table.count({
      where: {
        cluster_id: id,
      },
    });

    if (isActiveBUs > 0) {
      throw new BadRequestException('Cluster is in use');
    }

    const res = await this.db_System.cluster_table.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Cluster deleted successfully',
      id: res.id,
    };
  }
}
