import {
  ExtractReqService,
} from 'src/_lib/auth/extract-req/extract-req.service';
import {
  PrismaClientManagerService,
} from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaClient as dbSystem } from '@prisma-carmen-client-system';

@Injectable()
export class UserPermissionService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserPermissionService.name);

  async getPermissions(req: Request, permission: string, asList: boolean) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const roles = await this.db_System.tb_user_tb_application_role.findMany({
      where: {
        user_id: user_id,
      },
    });

    const permissions =
      await this.db_System.tb_application_role_tb_permission.findMany({
        where: {
          application_role_id: {
            in: roles.map((role) => role.application_role_id),
          },
        },
      });
  }
}
