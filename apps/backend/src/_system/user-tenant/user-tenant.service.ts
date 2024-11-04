import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Prisma,
  User,
  UserTenant,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client/system';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  UserTenantCreateDto,
  UserTenantUpdateDto,
} from './dto/user-tenant.dto';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class UserTenantService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  // _prisma_create: Prisma.UserTenantCreateInput = {};
  // _prisma_update: Prisma.UserTenantUpdateInput = {};

  async _getOne(db_System: dbSystem, id: string): Promise<UserTenant> {
    const res = await db_System.userTenant.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<UserTenant>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User - Tenant not found');
    }
    const res: ResponseSingle<UserTenant> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<UserTenant>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.userTenant.count({});
    const listObj = await this.db_System.userTenant.findMany();

    const res: ResponseList<UserTenant> = {
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
    createDto: UserTenantCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.userTenant.findFirst({
      where: {
        tenantId: createDto.tenantId,
        userId: createDto.userId,
      },
    });

    if (found) {
      throw new DuplicateException('Tenant - User already exists');
    }

    const createObj = await this.db_System.userTenant.create({
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
    updateDto: UserTenantUpdateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getOne(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('Tenant - User not found');
    }

    const updateObj = await this.db_System.userTenant.update({
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

    await this.db_System.userTenant.delete({
      where: {
        id: id,
      },
    });
  }
}
