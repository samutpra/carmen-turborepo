import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  ProductCategory,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';
import {
  ProductCategoryCreateDto,
  ProductCategoryUpdateDto,
} from '@carmensoftware/shared-dtos';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class ProductCategoryService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ProductCategoryService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<ProductCategory> {
    const res = await db_tenant.productCategory.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<ProductCategory>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('ProductCategory not found');
    }
    const res: ResponseSingle<ProductCategory> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<ProductCategory>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const max = await this.db_tenant.productCategory.count({
      where: q.where(),
    });
    const listObj = await this.db_tenant.productCategory.findMany(q.findMany());

    const res: ResponseList<ProductCategory> = {
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
    createDto: ProductCategoryCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.productCategory.findUnique({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'ProductCategory already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.productCategory.create({
      data: {
        ...createDto,
        createById: userId,
        createdAt: new Date(),
        updateById: userId,
        updateAt: new Date(),
      },
    });

    const res: ResponseId<string> = { id: createObj.id };
    return res;
  }

  async update(req: Request, id: string, updateDto: ProductCategoryUpdateDto) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('productCategory not found');
    }

    const updateObj = await this.db_tenant.productCategory.update({
      where: {
        id,
      },
      data: { ...updateDto, updateById: userId, updateAt: new Date() },
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
      throw new NotFoundException('productCategory not found');
    }

    await this.db_tenant.productCategory.delete({
      where: {
        id,
      },
    });
  }
}
