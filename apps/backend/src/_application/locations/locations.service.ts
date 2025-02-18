import {
  ResponseId,
  ResponseList,
  ResponseSingle,
} from "lib/helper/iResponse";
import QueryParams from "lib/types";
import { DuplicateException } from "lib/utils/exceptions";
import {
  LocationCreateDto,
  LocationUpdateDto,
} from "shared-dtos";
import {
  ExtractReqService,
} from "src/_lib/auth/extract-req/extract-req.service";
import {
  PrismaClientManagerService,
} from "src/_lib/prisma-client-manager/prisma-client-manager.service";

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  enum_location_type,
  PrismaClient as dbTenant,
  tb_location,
} from "@prisma-carmen-client-tenant";

@Injectable()
export class LocationsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(LocationsService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_location> {
    const res = await db_tenant.tb_location.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_location>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Location not found');
    }

    const res: ResponseSingle<tb_location> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_location>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_location.count({ where: q.where() });

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

    const listObj = await this.db_tenant.tb_location.findMany(q_include);

    const res: ResponseList<tb_location> = {
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
    createDto: LocationCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    this.logger.debug(createDto);

    const found = await this.db_tenant.tb_location.findFirst({
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

    const createObj = await this.db_tenant.tb_location.create({
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

    const updateObj = await this.db_tenant.tb_location.update({
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

    await this.db_tenant.tb_location.delete({
      where: {
        id,
      },
    });
  }
}
