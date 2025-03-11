import { ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  PrismaClient as dbSystem,
  tb_user_tb_business_unit,
} from '@prisma-carmen-client-system';

import { UserBusinessUnitController } from './user-business-unit.controller';

@Injectable()
export class UserBusinessUnitService {
  private db_System: dbSystem;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserBusinessUnitController.name);

  async _getById(
    db_System: dbSystem,
    id: string,
    user_id: string,
  ): Promise<tb_user_tb_business_unit> {
    const res = await db_System.tb_user_tb_business_unit.findUnique({
      where: {
        id: id,
        user_id: user_id,
      },
      // relationLoadStrategy: "join",
      include: {
        tb_business_unit: {
          select: {
            cluster_id: true,
            code: true,
            name: true,
            is_hq: true,
            is_active: true,
          },
        },
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_user_tb_business_unit>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    // this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id, user_id);

    if (!oneObj) {
      throw new NotFoundException('User - BusinessUnit not found');
    }
    const res: ResponseSingle<tb_user_tb_business_unit> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_user_tb_business_unit>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    // this.db_System = this.prismaClientManager.getSystemDB();
    const q_where = {
      ...q.where(),
      AND: {
        user_id: user_id,
      },
    };

    this.logger.debug(q_where);

    const max = await this.db_System.tb_user_tb_business_unit.count({
      where: q_where,
    });

    const q_include = {
      ...q.findMany(),
      // relationLoadStrategy: "join",
      include: {
        business_unit_table: {
          select: {
            cluster_id: true,
            code: true,
            name: true,
            is_hq: true,
            is_active: true,
          },
        },
        user_table: {
          select: {
            username: true,
            email: true,
            is_active: true,
          },
        },
      },
    };

    q_include.where = q_where;

    const listObj = await this.db_System.tb_user_tb_business_unit.findMany(
      q_include, // q.findMany(),
    );

    const res: ResponseList<tb_user_tb_business_unit> = {
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
}
