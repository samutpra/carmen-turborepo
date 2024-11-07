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

  async _getById(db_tenant: dbTenant, id: string): Promise<Department> {
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
    const oneObj = await this._getById(this.db_tenant, id);

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
    filter: Record<string, string>,
  ): Promise<ResponseList<Department>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const where: any = {};

    if (filter && Object.keys(filter).length > 0) {
      where.AND = Object.entries(filter).map(([key, value]) => ({
        [key]: { contains: value, mode: 'insensitive' },
      }));
    }

    if (search !== '') {
      where.AND = {
        ...where,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const max = await this.db_tenant.department.count({
      where: where,
    });
    const listObj = await this.db_tenant.department.findMany({
      where: where,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const res: ResponseList<Department> = {
      data: listObj,
      pagination: {
        total: max,
        page: page,
        perPage: perPage,
        pages: max == 0 ? 1 : Math.ceil(max / perPage),
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
    const oneObj = await this._getById(this.db_tenant, id);

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
    const oneObj = await this._getById(this.db_tenant, id);

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
