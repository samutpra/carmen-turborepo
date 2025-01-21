import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  CurrencyCreateDto,
  CurrencyCreateDtoList,
  CurrencyUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  Request,
} from '@nestjs/common';
import {
  PrismaClient as dbTenant,
  tb_currency,
} from '@prisma-carmen-client-tenant';

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

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_currency> {
    this.logger.debug({
      file: CurrenciesService.name,
      function: this._getById.name,
    });
    const res = await db_tenant.tb_currency.findUnique({
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
  ): Promise<ResponseSingle<tb_currency>> {
    this.logger.debug({
      file: CurrenciesService.name,
      function: this.findOne.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }
    const res: ResponseSingle<tb_currency> = {
      data: oneObj,
    };
    return res;
  }
  //#endregion GET ONE

  //#region GET ALL
  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_currency>> {
    this.logger.debug({
      file: CurrenciesService.name,
      function: this.findAll.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_currency.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_currency.findMany(q.findMany());

    const res: ResponseList<tb_currency> = {
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
  //#endregion GET ALL

  //#region CREATE
  async create(
    req: Request,
    createDto: CurrencyCreateDto,
  ): Promise<ResponseId<string>> {
    this.logger.debug({
      file: CurrenciesService.name,
      function: this.create.name,
    });
    // Check if currency already exists
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_currency.findUnique({
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

    const createObj = await this.db_tenant.tb_currency.create({
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

  //#region CREATE
  async createBatch(
    req: Request,
    createDtoList: CurrencyCreateDtoList,
  ): Promise<ResponseSingle<object[]>> {
    this.logger.debug({
      file: CurrenciesService.name,
      function: this.create.name,
    });

    const msg: object[] = [];

    // Check if currency already exists
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    await Promise.all(
      createDtoList.list.map(async (obj) => {
        let err_msg: object = {};

        const found = await this.db_tenant.tb_currency.findUnique({
          where: {
            code: obj.code,
          },
        });

        if (found) {
          err_msg = {
            statusCode: HttpStatus.CONFLICT,
            error: `Currency ${obj.code} already exists`,
            id: found.id,
          };
        } else {
          const createObj = await this.db_tenant.tb_currency.create({
            data: {
              ...obj,
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

          err_msg = {
            statusCode: HttpStatus.OK,
            error: '',
            id: createObj.id,
          };
        }

        this.logger.debug(err_msg);
        msg.push(err_msg);
      }),
    );

    const res: ResponseSingle<object[]> = { data: msg };

    return res;
  }
  //#endregion CREATE

  //#region UPDATE
  async update(
    req: Request,
    id: string,
    updateDto: CurrencyUpdateDto,
  ): Promise<ResponseId<string>> {
    this.logger.debug({
      file: CurrenciesService.name,
      function: this.update.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    const updateObj = await this.db_tenant.tb_currency.update({
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
    this.logger.debug({
      file: CurrenciesService.name,
      function: this.delete.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Currency not found');
    }

    await this.db_tenant.tb_currency.delete({
      where: {
        id,
      },
    });
  }
  //#endregion DELETE
}
