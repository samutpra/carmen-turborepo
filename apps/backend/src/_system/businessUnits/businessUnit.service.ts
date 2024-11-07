import {
  BusinessUnit,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client-system';
import {
  BusinessUnitCreateDto,
  BusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class BusinessUnitsService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  // _prisma_create: Prisma.TenantCreateInput = {
  //   code: '',
  //   name: '',
  //   Company: null,
  // };
  // _prisma_update: Prisma.TenantUpdateInput = {};

  async _getOne(db_System: dbSystem, id: string): Promise<BusinessUnit> {
    const res = await db_System.businessUnit.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<BusinessUnit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('BusinessUnit not found');
    }
    const res: ResponseSingle<BusinessUnit> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(req: Request): Promise<ResponseList<BusinessUnit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.businessUnit.count({});
    const listObj = await this.db_System.businessUnit.findMany();

    const res: ResponseList<BusinessUnit> = {
      data: listObj,
      pagination: {
        total: max,
        page: 1,
        perPage: Default_PerPage,
        pages: Math.ceil(max / Default_PerPage),
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

    const found = await this.db_System.businessUnit.findUnique({
      where: {
        clusterId_code: {
          clusterId: createDto.clusterId,
          code: createDto.code,
        },
      },
    });

    if (found) {
      throw new DuplicateException('Tenant already exists');
    }

    const createObj = await this.db_System.businessUnit.create({
      data: createDto,
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
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant not found');
    }

    const updateObj = await this.db_System.businessUnit.update({
      where: {
        id: id,
      },
      data: updateDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant not found');
    }

    await this.db_System.businessUnit.delete({
      where: {
        id: id,
      },
    });
  }
}
