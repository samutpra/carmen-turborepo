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
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  business_unit_table,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client-system';

import { BusinessUnitsController } from './businessUnit.controller';
import { DuplicateException } from 'lib/utils';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class BusinessUnitsService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(BusinessUnitsController.name);

  async _getById(
    db_System: dbSystem,
    id: string,
  ): Promise<business_unit_table> {
    const res = await db_System.business_unit_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<business_unit_table>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('BusinessUnit not found');
    }
    const res: ResponseSingle<business_unit_table> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<business_unit_table>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.business_unit_table.count({
      where: q.where(),
    });

    const listObj = await this.db_System.business_unit_table.findMany(
      q.findMany(),
    );

    const res: ResponseList<business_unit_table> = {
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
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const found = await this.db_System.business_unit_table.findUnique({
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

    const createObj = await this.db_System.business_unit_table.create({
      data: {
        ...createDto,
        created_by_id: userId,
        created_at: new Date(),
        updated_by_id: userId,
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
    const { userId, tenantId } = this.extractReqService.getByReq(req);
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
      const found = await this.db_System.business_unit_table.findUnique({
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

    const updateObj = await this.db_System.business_unit_table.update({
      where: {
        id: id,
      },
      data: { ...updateDto, updated_by_id: userId, updated_at: new Date() },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('BusinessUnit not found');
    }

    await this.db_System.business_unit_table.delete({
      where: {
        id: id,
      },
    });
  }
}
