import {
  Currency,
  Prisma,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';

import { CurrencyCreateDto } from '@carmensoftware/shared-dtos';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

@Injectable()
export class CurrenciesService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(CurrenciesService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<Currency> {
    const res = await db_tenant.currency.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  //#region GET ONE
  async findOne(req: Request, id: string): Promise<ResponseSingle<Currency>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }
    const res: ResponseSingle<Currency> = {
      data: oneObj,
    };
    return res;
  }
  //#endregion GET ONE

  //#region GET ALL
  async findAll(
    req: Request,
    page: number,
    perPage: number,
    search: string,
    filter: Record<string, string>,
  ): Promise<ResponseList<Currency>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const where: any = {};

    if (filter && Object.keys(filter).length > 0) {
      where.AND = Object.entries(filter).map(([key, value]) => ({
        [key]: { contains: value, mode: 'insensitive' },
      }));
    }

    if (search !== '') {
      where.AND = {
        ...where,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
          { symbol: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const max = await this.db_tenant.currency.count({
      where: where,
    });

    const listObj = await this.db_tenant.currency.findMany({
      where: where,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const res: ResponseList<Currency> = {
      data: listObj,
      pagination: {
        total: max,
        page: page,
        perPage: perPage,
        pages: max == 0 ? 1 : Math.ceil(max / perPage),
      },
    };
    return res;
  }
  //#endregion GET ALL

  //#region CREATE
  async create(
    req: Request,
    createDto: CurrencyCreateDto,
  ): Promise<ResponseId<string>> {
    // Check if currency already exists
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);

    const found = await this.db_tenant.currency.findUnique({
      where: {
        code: createDto.code ?? '',
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Currency already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.currency.create({
      data: {
        ...createDto,
        code: createDto.code ?? '',
        name: createDto.name ?? '',
        symbol: createDto.symbol ?? '',
        description: createDto.description ?? '',
        isActive: createDto.isActive ?? false,
      },
    });

    const res: ResponseId<string> = { id: createObj.id };

    return res;
  }
  //#endregion CREATE

  //#region UPDATE
  async update(
    req: Request,
    id: string,
    updateDto: Prisma.CurrencyUpdateInput,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    const updateObj = await this.db_tenant.currency.update({
      where: {
        id,
      },
      data: updateDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }
  //#endregion UPDATE

  //#region DELETE
  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(tenantId);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    await this.db_tenant.currency.delete({
      where: {
        id,
      },
    });
  }
  //#endregion DELETE
}
