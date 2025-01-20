import { ResponseList } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import { Injectable, Logger } from '@nestjs/common';
import {
  PrismaClient as dbSystem,
  tb_currency_iso,
} from '@prisma-carmen-client-system';

import { SystemCurrencyIsoController } from './system_currency_iso.controller';

@Injectable()
export class SystemCurrencyIsoService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemCurrencyIsoController.name);

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_currency_iso>> {
    this.logger.debug({
      file: SystemCurrencyIsoService.name,
      function: this.findAll.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.tb_currency_iso.count({
      where: q.where(),
    });

    const listObj = await this.db_System.tb_currency_iso.findMany(q.findMany());

    const res: ResponseList<tb_currency_iso> = {
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
}
