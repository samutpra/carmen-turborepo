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
  ProductCreateDto,
  ProductUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClient as dbTenant,
  tb_product,
} from '@prisma-carmen-client-tenant';

@Injectable()
export class ProductsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ProductsService.name);

  async getByItemsGroup(req: Request, q: QueryParams, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_product.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_product.findMany({
      where: {
        itemsGroupId: id,
        ...q.where(),
      },
      orderBy: q.orderBy(),
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const res: ResponseList<tb_product> = {
      data: listObj,
      pagination: {
        page: q.page,
        perPage: q.perpage,
        total: max,
      },
    };
    return res;
  }

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_product> {
    const res = await db_tenant.tb_product.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<tb_product>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    const res: ResponseSingle<tb_product> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_product>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const max = await this.db_tenant.tb_product.count({
      where: q.where(),
    });
    const listObj = await this.db_tenant.tb_product.findMany(q.findMany());

    const res: ResponseList<tb_product> = {
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
    createDto: ProductCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_product.findUnique({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Product already exists',
        id: found.id,
      });
    }
    const createObj = await this.db_tenant.tb_product.create({
      data: {
        ...createDto,
        primary_unit: createDto.primaryUnit_id || null,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = { id: createObj.id };
    return res;
  }

  async update(req: Request, id: string, updateDto: ProductUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    // const obj: Prisma.ProductUpdateInput = {
    //   id: updateDto.id,
    //   code: updateDto.code,
    //   name: updateDto.name,
    //   description: updateDto.description,
    //   isActive: updateDto.isActive,
    //   // ProductInfo: null,
    //   // ProductVendor: null,
    //   // UnitConversion: updateDto.UnitConversion,
    // };

    const updateObj = await this.db_tenant.tb_product.update({
      where: {
        id,
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
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    await this.db_tenant.tb_product.delete({
      where: {
        id,
      },
    });
  }
}
