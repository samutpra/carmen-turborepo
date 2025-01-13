import {
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils/exceptions';
import {
  ExtractReqService,
} from 'src/_lib/auth/extract-req/extract-req.service';
import {
  PrismaClientManagerService,
} from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClient as dbSystem,
  tb_user_tb_business_unit,
} from '@prisma-carmen-client-system';

import {
  SystemUserBusinessUnitController,
} from './system-user-business-unit.controller';

@Injectable()
export class SystemUserBusinessUnitService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemUserBusinessUnitController.name);

  async _getById(
    db_System: dbSystem,
    id: string,
  ): Promise<tb_user_tb_business_unit> {
    const res = await db_System.tb_user_tb_business_unit.findUnique({
      where: {
        id: id,
      },
      relationLoadStrategy: 'join',
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

        // tb_user: {
        //   select: {
        //     username: true,
        //     email: true,
        //     is_active: true,
        //   },
        // },
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_user_tb_business_unit>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

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
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.tb_user_tb_business_unit.count({
      where: q.where(),
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

    const listObj = await this.db_System.tb_user_tb_business_unit.findMany(
      q_include, // q.findMany(),
    );

    const res: ResponseList<tb_user_tb_business_unit> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perPage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  async create(
    req: Request,
    createDto: UserBusinessUnitCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const found = await this.db_System.tb_user_tb_business_unit.findFirst({
      where: {
        user_id: createDto.user_id,
        business_unit_id: createDto.business_unit_id,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User - BusinessUnit already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_System.tb_user_tb_business_unit.create({
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
    updateDto: UserBusinessUnitUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User - BusinessUnit not found');
    }

    const updateObj = await this.db_System.tb_user_tb_business_unit.update({
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
      throw new NotFoundException('User - BusinessUnit not found');
    }

    await this.db_System.tb_user_tb_business_unit.delete({
      where: {
        id: id,
      },
    });
  }
}
