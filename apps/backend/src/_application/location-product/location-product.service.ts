import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import {
  PrismaClient as dbTenant,
  enum_product_status_type,
} from "@prisma-carmen-client-tenant";
import QueryParams from "lib/types";
import { ResponseList } from "lib/helper/iResponse";

@Injectable()
export class LocationProductService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(LocationProductService.name);

  async getProductsByLocationId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: LocationProductService.name,
      function: this.getProductsByLocationId.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_product_location.count({
      where: {
        location_id: id,
        OR: [
          { tb_product: { name: { contains: q.search, mode: "insensitive" } } },
          { tb_product: { code: { contains: q.search, mode: "insensitive" } } },
          {
            tb_product: {
              product_status_type: Object.values(
                enum_product_status_type,
              ).includes(q.search as enum_product_status_type)
                ? (q.search as enum_product_status_type)
                : undefined,
            },
          },
        ],
      },
    });

    const query = await this.db_tenant.tb_product_location.findMany({
      where: {
        location_id: id,
        OR: [
          { tb_product: { name: { contains: q.search, mode: "insensitive" } } },
          { tb_product: { code: { contains: q.search, mode: "insensitive" } } },
          {
            tb_product: {
              product_status_type: Object.values(
                enum_product_status_type,
              ).includes(q.search as enum_product_status_type)
                ? (q.search as enum_product_status_type)
                : undefined,
            },
          },
        ],
      },

      select: {
        id: true,
        location_id: true,
        tb_product: {
          select: {
            id: true,
            name: true,
            code: true,
            product_status_type: true,
          },
        },
      },
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const products = query.map((item) => ({
      id: item.id,
      code: item.tb_product.code,
      name: item.tb_product.name,
      product_status_type: item.tb_product.product_status_type,
    }));

    this.logger.debug({ products: products });

    const res: ResponseList<any> = {
      data: products,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };

    return res;
  }
}
