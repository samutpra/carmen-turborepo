import {
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils/exceptions';
import {
  ProductItemGroupCreateDto,
  ProductItemGroupUpdateDto,
} from 'shared-dtos';
import {
  ExtractReqService,
} from 'src/_lib/auth/extract-req/extract-req.service';
import {
  PrismaClientManagerService,
} from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClient as dbTenant,
  tb_product_item_group,
} from '@prisma-carmen-client-tenant';

@Injectable()
export class ProductItemGroupService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ProductItemGroupService.name);

  async _getById(
    db_tenant: dbTenant,
    id: string,
  ): Promise<tb_product_item_group> {
    const res = await db_tenant.tb_product_item_group.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_product_item_group>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('productItemGroup not found');
    }
    const res: ResponseSingle<tb_product_item_group> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_product_item_group>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const max = await this.db_tenant.tb_product_item_group.count({
      where: q.where(),
    });
    const listObj = await this.db_tenant.tb_product_item_group.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_product_item_group> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };

    return res;
  }

  async create(
    req: Request,
    createDto: ProductItemGroupCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_product_item_group.findUnique({
      where: {
        code_name_product_subcategory_id: {
          code: createDto.code,
          name: createDto.name,
          product_subcategory_id: createDto.product_subcategory_id,
        },
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'productItemGroup already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.tb_product_item_group.create({
      data: {
        ...createDto,
        code: createDto.name.toUpperCase(),
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = { id: createObj.id };
    return res;
  }

  async update(req: Request, id: string, updateDto: ProductItemGroupUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('productItemGroup not found');
    }

    const updateObj = await this.db_tenant.tb_product_item_group.update({
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
      throw new NotFoundException('productItemGroup not found');
    }

    await this.db_tenant.tb_product_item_group.delete({
      where: {
        id,
      },
    });
  }
}
