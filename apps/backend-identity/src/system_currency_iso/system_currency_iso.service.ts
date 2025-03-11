import { Injectable, Logger } from '@nestjs/common';
import { tb_currency_iso } from '@prisma/client';
import { ResponseList } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SystemCurrencyIsoService {
  constructor(
    private prismaService: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(SystemCurrencyIsoService.name);
  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_currency_iso>> {
    this.logger.log({ q });
    const max = await this.prismaService.tb_currency_iso.count({
      where: q.where(),
    });

    const listObj = await this.prismaService.tb_currency_iso.findMany(
      q.findMany(),
    );

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
