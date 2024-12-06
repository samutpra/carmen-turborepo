import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  LocationCreateDto,
  LocationUpdateDto,
} from '@carmensoftware/shared-dtos';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  PrismaClient as dbTenant,
  enum_location_type,
  location_table,
} from '@prisma-carmen-client-tenant';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class LocationsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(LocationsService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<location_table> {
    const res = await db_tenant.location_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<location_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Location not found');
    }

    const res: ResponseSingle<location_table> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<location_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.location_table.count({ where: q.where() });

    const q_include = {
      ...q.findMany(),
      // relationLoadStrategy: 'query',
      // include: {
      //   DeliveryPoint: {
      //     select: {
      //       name: true,
      //       isActive: true,
      //     },
      //     // where: {
      //     //   name: { contains: 'sampl', mode: 'insensitive' },
      //     // },
      //   },
      // },
    };

    // this.logger.debug(q_include);

    // const typedSql = await this.db_tenant.$queryRaw`select name from Location`;
    // this.logger.debug(typedSql);

    const listObj = await this.db_tenant.location_table.findMany(q_include);

    const res: ResponseList<location_table> = {
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
    createDto: LocationCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    this.logger.debug(createDto);

    const found = await this.db_tenant.location_table.findFirst({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Location already exists',
        id: found.id,
      });
    }

    if (!createDto.location_type) {
      throw new NotFoundException('Location type not found');
    }

    const location_type =
      createDto.location_type as unknown as enum_location_type;

    const createObj = await this.db_tenant.location_table.create({
      data: {
        ...createDto,
        location_type: location_type,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });
    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateDto: LocationUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Location not found');
    }

    const location_type =
      updateDto.location_type as unknown as enum_location_type;

    const updateObj = await this.db_tenant.location_table.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
        location_type: location_type,
        updated_by_id: user_id,
        updated_at: new Date(),
      },
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
      throw new NotFoundException('Location not found');
    }

    await this.db_tenant.location_table.delete({
      where: {
        id,
      },
    });
  }
}
