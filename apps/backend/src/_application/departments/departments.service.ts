import {
  Department,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';
import { DepartmentCreateDto, DepartmentUpdateDto } from 'shared-dtos';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class DepartmentsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  // _prisma_create: Prisma.DepartmentCreateInput = { name: '' };
  // _prisma_update: Prisma.DepartmentUpdateInput = {};

  async _getOne(db_tenant: dbTenant, id: string): Promise<Department> {
    const res = await db_tenant.department.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<Department>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Department not found');
    }
    const res: ResponseSingle<Department> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    page: number,
    perPage: number,
    search: string,
  ): Promise<ResponseList<Department>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const max = await this.db_tenant.department.count({
      where: { name: { contains: search } },
    });
    const listObj = await this.db_tenant.department.findMany({
      where: { name: { contains: search } },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const res: ResponseList<Department> = {
      data: listObj,
      pagination: {
        total: max,
        page: page,
        perPage: perPage,
        pages: Math.ceil(max / perPage),
      },
    };

    return res;
  }

  async create(
    req: Request,
    createDto: DepartmentCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.department.findUnique({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Department already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.department.create({
      data: createDto,
    });

    const res: ResponseId<string> = { id: createObj.id };
    return res;
  }

  async update(req: Request, id: string, updateDto: DepartmentUpdateDto) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Department not found');
    }

    const updateObj = await this.db_tenant.department.update({
      where: {
        id,
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
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Department not found');
    }

    await this.db_tenant.department.delete({
      where: {
        id,
      },
    });
  }
}
