import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  ProductSubCategory,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';
import {
  ProductSubCategoryCreateDto,
  ProductSubCategoryUpdateDto,
} from 'shared-dtos';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { Default_PerPage } from 'lib/helper/perpage.default';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class ProductSubCategoryService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  // _prisma_create: Prisma.DepartmentCreateInput = { name: '' };
  // _prisma_update: Prisma.DepartmentUpdateInput = {};

  async _getOne(db_tenant: dbTenant, id: string): Promise<ProductSubCategory> {
    const res = await db_tenant.productSubCategory.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<ProductSubCategory>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('ProductSubCategory not found');
    }
    const res: ResponseSingle<ProductSubCategory> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request): Promise<ResponseList<ProductSubCategory>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const max = await this.db_tenant.productSubCategory.count({});
    const listObj = await this.db_tenant.productSubCategory.findMany();

    const res: ResponseList<ProductSubCategory> = {
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
    createDto: ProductSubCategoryCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.productSubCategory.findUnique({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'ProductSubCategory already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.productSubCategory.create({
      data: createDto,
    });

    const res: ResponseId<string> = { id: createObj.id };
    return res;
  }

  async update(
    req: Request,
    id: string,
    updateDto: ProductSubCategoryUpdateDto,
  ) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getOne(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('ProductSubCategory not found');
    }

    const updateObj = await this.db_tenant.productSubCategory.update({
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
      throw new NotFoundException('ProductSubCategory not found');
    }

    await this.db_tenant.productSubCategory.delete({
      where: {
        id,
      },
    });
  }
}
