import {
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import {
  ExtractReqService,
} from 'src/_lib/auth/extract-req/extract-req.service';
import {
  PrismaClientManagerService,
} from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  BusinessUnitCreateDto,
  BusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClient as dbSystem,
  tb_business_unit,
} from '@prisma-carmen-client-system';

import {
  SystemBusinessUnitController,
} from './system-business-unit.controller';

@Injectable()
export class SystemBusinessUnitService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemBusinessUnitController.name);

  async _getById(db_System: dbSystem, id: string): Promise<tb_business_unit> {
    const res = await db_System.tb_business_unit.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_business_unit>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('BusinessUnit not found');
    }
    const res: ResponseSingle<tb_business_unit> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_business_unit>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.tb_business_unit.count({
      where: q.where(),
    });

    const listObj = await this.db_System.tb_business_unit.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_business_unit> = {
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
    createDto: BusinessUnitCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const found = await this.db_System.tb_business_unit.findUnique({
      where: {
        cluster_id_code: {
          cluster_id: createDto.cluster_id,
          code: createDto.code,
        },
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'BusinessUnit already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_System.tb_business_unit.create({
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
    updateDto: BusinessUnitUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('BusinessUnit not found');
    }

    if (updateDto.cluster_id == null) {
      updateDto.cluster_id = oneObj.cluster_id;
    }
    if (updateDto.code == null) {
      updateDto.code = oneObj.code;
    }

    // check duplicate
    if (
      oneObj.cluster_id != updateDto.cluster_id ||
      oneObj.code != updateDto.code
    ) {
      const found = await this.db_System.tb_business_unit.findUnique({
        where: {
          cluster_id_code: {
            cluster_id: updateDto.cluster_id,
            code: updateDto.code,
          },
        },
      });
      if (found) {
        throw new DuplicateException({
          statusCode: HttpStatus.CONFLICT,
          message: `BusinessUnit [cluster_id : ${updateDto.cluster_id} , code : ${updateDto.code}] already exists`,
          id: found.id,
        });
      }
    }

    const updateObj = await this.db_System.tb_business_unit.update({
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
      throw new NotFoundException('BusinessUnit not found');
    }

    await this.db_System.tb_business_unit.delete({
      where: {
        id: id,
      },
    });
  }
}
