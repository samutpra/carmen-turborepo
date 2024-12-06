import {
  CurrencyCreateDto,
  CurrencyUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  currency_table,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class CurrenciesService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(CurrenciesService.name);

  // async advanceSearch(searchParams: {
  //   searchTerm?: string;
  //   startDate?: Date;
  //   endDate?: Date;
  // }) {
  //   const { searchTerm, startDate, endDate } = searchParams;

  //   const where: any = {
  //     AND: [] as any[],
  //   };

  //   // Add search term condition if provided
  //   if (searchTerm) {
  //     where.AND.push({
  //       OR: [
  //         { name: { contains: searchTerm, mode: 'insensitive' } },
  //         { code: { contains: searchTerm, mode: 'insensitive' } },
  //         { symbol: { contains: searchTerm, mode: 'insensitive' } },
  //         { description: { contains: searchTerm, mode: 'insensitive' } },
  //       ],
  //     });
  //   }

  //   // Add date range if provided
  //   if (startDate || endDate) {
  //     where.AND.push({
  //       createdAt: {
  //         ...(startDate && { gte: startDate }),
  //         ...(endDate && { lte: endDate }),
  //       },
  //     });
  //   }

  //   return where;
  // }

  async _getById(db_tenant: dbTenant, id: string): Promise<currency_table> {
    const res = await db_tenant.currency_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  //#region GET ONE
  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<currency_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }
    const res: ResponseSingle<currency_table> = {
      data: oneObj,
    };
    return res;
  }
  //#endregion GET ONE

  //#region GET ALL
  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<currency_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.currency_table.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.currency_table.findMany(q.findMany());

    const res: ResponseList<currency_table> = {
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
  //#endregion GET ALL

  //#region CREATE
  async create(
    req: Request,
    createDto: CurrencyCreateDto,
  ): Promise<ResponseId<string>> {
    // Check if currency already exists
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.currency_table.findUnique({
      where: {
        code: createDto.code,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Currency already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.currency_table.create({
      data: {
        ...createDto,
        // code: createDto.code ?? '',
        // name: createDto.name ?? '',
        // symbol: createDto.symbol ?? '',
        // description: createDto.description ?? '',
        // isActive: createDto.isActive ?? false,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
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
    updateDto: CurrencyUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    const updateObj = await this.db_tenant.currency_table.update({
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
  //#endregion UPDATE

  //#region DELETE
  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    await this.db_tenant.currency_table.delete({
      where: {
        id,
      },
    });
  }
  //#endregion DELETE
}
