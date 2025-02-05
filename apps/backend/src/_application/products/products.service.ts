import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils/exceptions';
import { ProductCreateDto, ProductUpdateDto } from 'shared-dtos';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

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
    this.logger.debug({
      file: ProductsService.name,
      function: this.getByItemsGroup.name,
    });
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
        perpage: q.perpage,
        total: max,
      },
    };
    return res;
  }

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_product> {
    this.logger.debug({
      file: ProductsService.name,
      function: this._getById.name,
    });

    const res = await db_tenant.tb_product.findUnique({
      where: {
        id: id,
      },
      include: {
        tb_product_info: true,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<tb_product>> {
    this.logger.debug({
      file: ProductsService.name,
      function: this.findOne.name,
    });
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
    this.logger.debug({
      file: ProductsService.name,
      function: this.findAll.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const max = await this.db_tenant.tb_product.count({
      where: q.where(),
    });

    const include = {
      ...q.findMany(),
      include: {
        tb_product_info: true,
      },
    };

    const listObj = await this.db_tenant.tb_product.findMany(include);

    const res: ResponseList<tb_product> = {
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

  async create(req: Request, createDto: ProductCreateDto) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.create.name,
    });
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

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const product_obj: any = {
        code: createDto.code,
        name: createDto.name,
        local_name: createDto.local_name,
        description: createDto.description,
        primary_unit_id: createDto.primary_unit_id,
        product_status_type: createDto.product_status_type,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.debug(product_obj);

      const createObj = await transactionClient.tb_product.create({
        data: {
          ...product_obj,
          created_by_id: user_id,
          created_at: new Date(),
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      const product_Info_obj: any = {
        product_id: createObj.id,
        product_item_group_id: createDto.product_item_group_id,
        price: createDto.price,
        tax_type: createDto.tax_type,
        tax_rate: createDto.tax_rate,
        is_ingredients: createDto.is_ingredients,
        price_deviation_limit: createDto.price_deviation_limit,
        info: createDto.info,
      };

      this.logger.debug(product_obj);

      await transactionClient.tb_product_info.create({
        data: {
          ...product_Info_obj,
          created_by_id: user_id,
          created_at: new Date(),
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      const res: ResponseId<string> = { id: createObj.id };
      return res;
    });

    return tx;
  }

  async update(req: Request, id: string, updateDto: ProductUpdateDto) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.update.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

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
    this.logger.debug({
      file: ProductsService.name,
      function: this.delete.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      await transactionClient.tb_product_info.deleteMany({
        where: {
          product_id: id,
        },
      });

      await transactionClient.tb_product.delete({
        where: {
          id,
        },
      });
    });
  }
}
