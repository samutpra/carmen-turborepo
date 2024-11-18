import {
  ExchangeRateCreateDto,
  ExchangeRateUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  PrismaClient as dbTenant,
  exchange_rate_table,
} from '@prisma-carmen-client-tenant';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class ExchangerateService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ExchangerateService.name);

  async _getById(
    db_tenant: dbTenant,
    id: string,
  ): Promise<exchange_rate_table> {
    const res = await db_tenant.exchange_rate_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<exchange_rate_table>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const res: ResponseSingle<exchange_rate_table> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<exchange_rate_table>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const max = await this.db_tenant.exchange_rate_table.count({
      where: q.where(),
    });
    const listObj = await this.db_tenant.exchange_rate_table.findMany(
      q.findMany(),
    );

    const res: ResponseList<exchange_rate_table> = {
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
    createDto: ExchangeRateCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.exchange_rate_table.findUnique({
      where: {
        dateAt_currencyId: {
          currencyId: createDto.currencyId,
          dateAt: createDto.dateAt,
        },
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Exchange Rate already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.exchange_rate_table.create({
      data: {
        ...createDto,
        createById: userId,
        createdAt: new Date(),
        updateById: userId,
        updateAt: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };
    return res;
  }

  async update(req: Request, id: string, updateDto: ExchangeRateUpdateDto) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const updateObj = await this.db_tenant.exchange_rate_table.update({
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
      throw new NotFoundException('Exchangerate not found');
    }

    await this.db_tenant.exchange_rate_table.delete({
      where: {
        id,
      },
    });
  }
}
