import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClient as dbTenant, tb_unit } from '@prisma/client';

@Injectable()
export class UnitsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UnitsService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_unit> {
    const res = await this.db_tenant.tb_unit.findUnique({
      where: {
        id: id,
      },
    });
}
