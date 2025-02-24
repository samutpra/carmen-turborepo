import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaClientManagerService } from "../../../_lib/prisma-client-manager/prisma-client-manager.service";
import { PrismaClient as dbTenant } from "@prisma-carmen-client-tenant";
import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";

import { PrismaClient as dbSystem } from "@prisma-carmen-client-system";

@Injectable()
export class UserBusinessUnitService {
  private db_tenant: dbTenant;
  private db_system: dbSystem;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserBusinessUnitService.name);

  async findOne(req: Request) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    this.db_system = this.prismaClientManager.getSystemDB();

    const userBusinessUnit = await this.db_system.tb_user_tb_business_unit
      .findMany({
        where: {
          business_unit_id: business_unit_id,
          is_active: true,
        },
        select: {
          user_id: true,
        },
      })
      .then((res) => {
        return Promise.all(
          res.map(async (item) => {
            const user = await this.db_system.tb_user.findMany({
              where: {
                id: item.user_id,
              },
              select: {
                id: true,
                email: true,
                tb_user_profile_tb_user_profile_user_idTotb_user: {
                  select: {
                    firstname: true,
                    lastname: true,
                    middlename: true,
                  },
                },
              },
            });

            return {
              id: user[0].id,
              email: user[0].email,
              userInfo:
                user[0].tb_user_profile_tb_user_profile_user_idTotb_user[0],
            };
          }),
        );
      });

    const res: ResponseSingle<any> = {
      data: userBusinessUnit,
    };

    return res;
  }
}
