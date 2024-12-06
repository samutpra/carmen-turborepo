import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  PrismaClient as dbSystem,
  user_business_unit_table,
} from '@prisma-carmen-client-system';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';
import { UserBusinessUnitController } from './user-business-unit.controller';

@Injectable()
export class UserBusinessUnitService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserBusinessUnitController.name);

  async _getById(
    db_System: dbSystem,
    id: string,
    user_id: string,
  ): Promise<user_business_unit_table> {
    const res = await db_System.user_business_unit_table.findUnique({
      where: {
        id: id,
        user_id: user_id,
      },
      relationLoadStrategy: 'join',
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
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<user_business_unit_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id, user_id);

    if (!oneObj) {
      throw new NotFoundException('User - BusinessUnit not found');
    }
    const res: ResponseSingle<user_business_unit_table> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<user_business_unit_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const q_where = {
      ...q.where(),
      AND: {
        user_id: user_id,
      },
    };

    this.logger.debug(q_where);

    const max = await this.db_System.user_business_unit_table.count({
      where: q_where,
    });

    const q_include = {
      ...q.findMany(),
      relationLoadStrategy: 'join',
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

    const listObj = await this.db_System.user_business_unit_table.findMany(
      q_include, // q.findMany(),
    );

    const res: ResponseList<user_business_unit_table> = {
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
}
