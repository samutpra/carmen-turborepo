import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientManagerService } from "../../_lib/prisma-client-manager/prisma-client-manager.service";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClient as dbSystem } from "@prisma-carmen-client-system";
import { PrismaClient as dbTenant } from "@prisma-carmen-client-tenant";
import { ResponseId } from "lib/helper/iResponse";
import { UpdateLocationUserDto } from "shared-dtos/locations-user/locations-user.dto";

@Injectable()
export class LocationsUserService {
  private db_system: dbSystem;
  private db_tenant: dbTenant;
  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(LocationsUserService.name);

  async getLocationsByUserId(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const locations = await this.db_tenant.tb_user_location.findMany({
      where: {
        user_id: id,
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

    return locations;
  }

  async managerLocationUser(
    req: Request,
    userId: string,
    updateDto: UpdateLocationUserDto,
  ) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    this.db_system = this.prismaClientMamager.getSystemDB();

    const user = await this.db_system.tb_user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (updateDto.locations) {
      if (updateDto.locations.add) {
        const found = await this.db_tenant.tb_user_location.findMany({
          where: {
            user_id: userId,
            location_id: {
              in: updateDto.locations.add.map(
                (location) => location.location_id,
              ),
            },
          },
        });

        if (found.length > 0) {
          throw new NotFoundException("User location already exists");
        }

        let locationNotFound = [];
        await Promise.all(
          updateDto.locations.add.map(async (location) => {
            const findLocation = await this.db_tenant.tb_location.findUnique({
              where: { id: location.location_id },
            });

            if (!findLocation) {
              locationNotFound.push(location.location_id);
            }
          }),
        );

        if (locationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Add Location not found",
            data: locationNotFound,
          });
        }
      }

      if (updateDto.locations.remove) {
        let userLocationNotFound = [];
        await Promise.all(
          updateDto.locations.remove.map(async (location) => {
            const findLocation =
              await this.db_tenant.tb_user_location.findUnique({
                where: { id: location.user_location_id },
              });

            if (!findLocation) {
              userLocationNotFound.push(location.user_location_id);
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
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      if (updateDto.locations.add) {
        const add_user_location_obj = updateDto.locations.add.map(
          (location) => ({
            user_id: userId,
            location_id: location.location_id,
          }),
        );

        this.logger.debug(add_user_location_obj);

        await transactionClient.tb_user_location.createMany({
          data: add_user_location_obj,
        });
      }

      if (updateDto.locations.remove) {
        const remove_user_location_obj = updateDto.locations.remove.map(
          (location) => ({
            id: location.user_location_id,
            user_id: userId,
          }),
        );

        this.logger.debug(remove_user_location_obj);

        await transactionClient.tb_user_location.deleteMany({
          where: {
            user_id: userId,
            id: {
              in: remove_user_location_obj.map((location) => location.id),
            },
          },
        });
      }

      const res: ResponseId<string> = {
        id: userId,
      };

      return res;
    });

    return tx;
  }
}
