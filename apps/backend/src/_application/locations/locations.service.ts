import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import { DuplicateException } from "lib/utils/exceptions";
import { LocationCreateDto, LocationUpdateDto } from "shared-dtos";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  enum_location_type,
  PrismaClient as dbTenant,
  tb_location,
} from "@prisma-carmen-client-tenant";

import { PrismaClient as dbSystem } from "@prisma-carmen-client-system";

@Injectable()
export class LocationsService {
  private db_tenant: dbTenant;
  private db_system: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(LocationsService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_location> {
    const res = await db_tenant.tb_location.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_location>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Location not found");
    }

    const res: ResponseSingle<tb_location> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_location>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_location.count({ where: q.where() });

    const q_include = {
      ...q.findMany(),
      // relationLoadStrategy: 'query',
      // include: {
      //   DeliveryPoint: {
      //     select: {
      //       name: true,
      //       isActive: true,
      //     },
      //     // where: {
      //     //   name: { contains: 'sampl', mode: 'insensitive' },
      //     // },
      //   },
      // },
    };

    // this.logger.debug(q_include);

    // const typedSql = await this.db_tenant.$queryRaw`select name from Location`;
    // this.logger.debug(typedSql);

    const listObj = await this.db_tenant.tb_location.findMany(q_include);

    const res: ResponseList<tb_location> = {
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

  async create(
    req: Request,
    createDto: LocationCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    this.db_system = this.prismaClientMamager.getSystemDB();
    this.logger.debug(createDto);

    if (createDto.user?.add) {
      let userNotFound = [];
      await Promise.all(
        createDto.user.add.map(async (user) => {
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

    const found = await this.db_tenant.tb_location.findFirst({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "Location already exists",
        id: found.id,
      });
    }

    if (!createDto.location_type) {
      throw new NotFoundException("Location type not found");
    }

    const location_type =
      createDto.location_type as unknown as enum_location_type;

    const locationObj = {
      name: createDto.name,
      location_type: location_type,
      description: createDto.description,
      info: createDto.info ?? null,
      delivery_point_id: createDto.deliveryPointId ?? null,
      is_active: createDto.is_active ?? true,
      created_by_id: user_id,
      created_at: new Date(),
      updated_by_id: user_id,
      updated_at: new Date(),
    };

    const createObj = await this.db_tenant.tb_location.create({
      data: {
        ...locationObj,
      },
    });

    if (createDto.user?.add) {
      const user_location_obj = createDto.user.add.map((user) => ({
        location_id: createObj.id,
        user_id: user.user_id,
      }));

      await this.db_tenant.tb_user_location.createMany({
        data: user_location_obj,
      });
    }

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateDto: LocationUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    this.db_system = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Location not found");
    }

    if (updateDto.user) {
      if (updateDto.user.add) {
        let userNotFound = [];
        await Promise.all(
          updateDto.user.add.map(async (user) => {
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

      if (updateDto.user.remove) {
        let userLocationNotFound = [];
        await Promise.all(
          updateDto.user.remove.map(async (user) => {
            const findUserLocation =
              await this.db_tenant.tb_user_location.findFirst({
                where: { user_id: user.user_id, location_id: id },
              });

            if (!findUserLocation) {
              userLocationNotFound.push(user.user_id);
            }
          }),
        );

        if (userLocationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Remove User not found",
            data: userLocationNotFound,
          });
        }

        let userNotFound = [];
        await Promise.all(
          updateDto.user.remove.map(async (user) => {
            const findUserLocation = await this.db_system.tb_user.findUnique({
              where: { id: user.user_id },
            });

            if (!findUserLocation) {
              userNotFound.push(user.user_id);
            }
          }),
        );

        if (userNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Remove User not found",
            data: userNotFound,
          });
        }
      }
    }

    const location_type =
      updateDto.location_type as unknown as enum_location_type;

    const oldLocation = await this.db_tenant.tb_location.findUnique({
      where: {
        id,
      },
    });

    const updateLocationObj = {
      name: updateDto.name ?? oldLocation.name,
      location_type: location_type ?? oldLocation.location_type,
      description: updateDto.description ?? oldLocation.description,
      info: updateDto.info ?? oldLocation.info,
      delivery_point_id:
        updateDto.deliveryPointId ?? oldLocation.delivery_point_id,
      is_active: updateDto.is_active ?? oldLocation.is_active,
      updated_by_id: user_id,
      updated_at: new Date(),
    };

    const updateObj = await this.db_tenant.tb_location.update({
      where: {
        id,
      },
      data: {
        ...updateLocationObj,
      },
    });

    if (updateDto.user) {
      if (updateDto.user.add) {
        const userLocationAddObj = updateDto.user.add.map((user) => ({
          location_id: id,
          user_id: user.user_id,
        }));

        console.log(userLocationAddObj);

        await this.db_tenant.tb_user_location.createMany({
          data: userLocationAddObj,
        });
      }

      if (updateDto.user.remove) {
        const userLocationRemoveObj = updateDto.user.remove.map((user) => ({
          location_id: id,
          user_id: user.user_id,
        }));

        await this.db_tenant.tb_user_location.deleteMany({
          where: {
            location_id: id,
            user_id: {
              in: userLocationRemoveObj.map((user) => user.user_id),
            },
          },
        });
      }
    }

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientMamager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Location not found");
    }

    await this.db_tenant.tb_location.delete({
      where: {
        id,
      },
    });
  }
}
