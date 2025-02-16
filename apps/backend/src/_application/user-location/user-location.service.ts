import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientManagerService } from "../../_lib/prisma-client-manager/prisma-client-manager.service";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClient as dbTenant } from "@prisma-carmen-client-tenant";
import { PrismaClient as dbSystem } from "@prisma-carmen-client-system";
import { UpdateUserLocationDto } from "shared-dtos/user-location/user-location.dto";
import { ResponseId } from "lib/helper/iResponse";

@Injectable()
export class UserLocationService {
  private db_tenant: dbTenant;
  private db_system: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserLocationService.name);

  async getUsersByLocationId(req: Request, location_id: string) {
    this.db_system = this.prismaClientMamager.getSystemDB();

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const users = await this.db_tenant.tb_user_location.findMany({
      where: {
        location_id: location_id,
      },
      select: {
        id: true,
        user_id: true,
        tb_location: {
          select: {
            id: true,
            name: true,
            location_type: true,
          },
        },
      },
    });
    return users;
  }

  async managerUserLocation(
    req: Request,
    locationId: string,
    body: UpdateUserLocationDto,
  ) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    this.db_system = this.prismaClientMamager.getSystemDB();

    const location = await this.db_tenant.tb_location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException("Location not found");
    }

    if (body.users) {
      if (body.users.add) {
        const found = await this.db_tenant.tb_user_location.findMany({
          where: {
            location_id: locationId,
            user_id: { in: body.users.add.map((user) => user.user_id) },
          },
        });

        if (found.length > 0) {
          throw new NotFoundException("User location already exists");
        }

        let userNotFound = [];
        await Promise.all(
          body.users.add.map(async (user) => {
            const findUser = await this.db_system.tb_user.findUnique({
              where: { id: user.user_id },
            });

            if (!findUser) {
              userNotFound.push(user.user_id);
            }
          }),
        );

        if (userNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Add User not found",
            data: userNotFound,
          });
        }
      }

      if (body.users.remove) {
        let userLocationNotFound = [];
        await Promise.all(
          body.users.remove.map(async (user) => {
            const findUser = await this.db_tenant.tb_user_location.findUnique({
              where: { id: user.user_location_id },
            });

            if (!findUser) {
              userLocationNotFound.push(user.user_location_id);
            }
          }),
        );

        if (userLocationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "User Location not found",
            data: userLocationNotFound,
          });
        }
      }

      const tx = this.db_tenant.$transaction(async (transactionClient) => {
        if (body.users.add) {
          const add_user_location_obj = body.users.add.map((user) => ({
            user_id: user.user_id,
            location_id: locationId,
          }));

          this.logger.debug(add_user_location_obj);

          await transactionClient.tb_user_location.createMany({
            data: add_user_location_obj,
          });
        }

        if (body.users.remove) {
          const remove_user_location_obj = body.users.remove.map((user) => ({
            id: user.user_location_id,
            user_id: user_id,
          }));

          this.logger.debug(remove_user_location_obj);

          await transactionClient.tb_user_location.deleteMany({
            where: {
              location_id: locationId,
              id: { in: remove_user_location_obj.map((user) => user.id) },
            },
          });
        }

        const res: ResponseId<string> = {
          id: locationId,
        };

        return res;
      });

      return tx;
    }
  }
}
