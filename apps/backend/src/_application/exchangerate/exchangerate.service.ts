import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExchangeRateCreateDto, ExchangeRateUpdateDto } from 'shared-dtos';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient as dbTenant, tb_exchange_rate } from '@prisma/client';

@Injectable()
export class ExchangerateService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ExchangerateService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_exchange_rate> {
    const res = await db_tenant.tb_exchange_rate.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_exchange_rate>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const res: ResponseSingle<tb_exchange_rate> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_exchange_rate>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const max = await this.db_tenant.tb_exchange_rate.count({
      where: q.where(),
    });
    const listObj = await this.db_tenant.tb_exchange_rate.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_exchange_rate> = {
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
    createDto: ExchangeRateCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_exchange_rate.findUnique({
      where: {
        at_date_currency_id: {
          currency_id: createDto.currency_id,
          at_date: createDto.at_date,
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

    const createObj = await this.db_tenant.tb_exchange_rate.create({
      data: {
        ...createDto,
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

  async update(req: Request, id: string, updateDto: ExchangeRateUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    const updateObj = await this.db_tenant.tb_exchange_rate.update({
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Exchangerate not found');
    }

    await this.db_tenant.tb_exchange_rate.delete({
      where: {
        id,
      },
    });
  }
}
