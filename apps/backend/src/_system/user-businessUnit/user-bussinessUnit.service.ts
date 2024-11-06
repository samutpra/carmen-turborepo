import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  UserBusinessUnit,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client-system';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from 'shared-dtos';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class UserBusinessUnitService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  // _prisma_create: Prisma.UserTenantCreateInput = {};
  // _prisma_update: Prisma.UserTenantUpdateInput = {};

  async _getOne(db_System: dbSystem, id: string): Promise<UserBusinessUnit> {
    const res = await db_System.userBusinessUnit.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<UserBusinessUnit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User - Tenant not found');
    }
    const res: ResponseSingle<UserBusinessUnit> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<UserBusinessUnit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.userBusinessUnit.count({});
    const listObj = await this.db_System.userBusinessUnit.findMany();

    const res: ResponseList<UserBusinessUnit> = {
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
    createDto: UserBusinessUnitCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.userBusinessUnit.findFirst({
      where: {
        userId: createDto.userId,
        businessunitId: createDto.businessUnitId,
      },
    });

    if (found) {
      throw new DuplicateException('Tenant - User already exists');
    }

    const createObj = await this.db_System.userBusinessUnit.create({
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
    updateDto: UserBusinessUnitUpdateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant - User not found');
    }

    const updateObj = await this.db_System.userBusinessUnit.update({
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
      throw new NotFoundException('Tenant - User not found');
    }

    await this.db_System.userBusinessUnit.delete({
      where: {
        id: id,
      },
    });
  }
}
