import { ResponseList } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import { Injectable, Logger } from '@nestjs/common';
import {
  enum_location_type,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';

@Injectable()
export class ProductLocationService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ProductLocationService.name);

  async getLocationsByProductId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: ProductLocationService.name,
      function: this.getLocationsByProductId.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_product_location.count({
      where: {
        product_id: id,
        tb_location: {
          is_active: true,
          OR: [
            { name: { contains: q.search, mode: 'insensitive' } },
            {
              location_type: Object.values(enum_location_type).includes(
                q.search as enum_location_type,
              )
                ? (q.search as enum_location_type)
                : undefined,
            },
          ],
        },
      },
    });

    const query = await this.db_tenant.tb_product_location.findMany({
      where: {
        product_id: id,
        tb_location: {
          is_active: true,
          OR: [
            { name: { contains: q.search, mode: 'insensitive' } },
            {
              location_type: Object.values(enum_location_type).includes(
                q.search as enum_location_type,
              )
                ? (q.search as enum_location_type)
                : undefined,
            },
          ],
        },
      },
      select: {
        id: true,
        product_id: true,
        tb_location: {
          select: {
            id: true,
            name: true,
            location_type: true,
          },
        },
      },
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const locations = query.map((item) => ({
      id: item.id,
      location_id: item.tb_location.id,
      location_name: item.tb_location.name,
      location_type: item.tb_location.location_type,
    }));

    this.logger.debug({ locations: locations });

    const res: ResponseList<any> = {
      data: locations,
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
