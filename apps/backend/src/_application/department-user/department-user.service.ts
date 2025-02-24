import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaClientManagerService } from "../../_lib/prisma-client-manager/prisma-client-manager.service";
import {
  PrismaClient as dbTenant,
  tb_department_user,
} from "@prisma-carmen-client-tenant";
import { PrismaClient as dbSystem } from "@prisma-carmen-client-system";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import {
  DepartmentUserCreateDto,
  DepartmentUserUpdateDto,
} from "shared-dtos/department-user/department-user.dto";
import { DuplicateException } from "lib/utils";

@Injectable()
export class DepartmentUserService {
  private db_tenant: dbTenant;
  private db_system: dbSystem;

  constructor(
    private prisma: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(DepartmentUserService.name);

  async _getById(db_tenant: dbTenant, id: string) {
    const res = await db_tenant.tb_department_user.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        hod: true,
        tb_department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res;
  }

  async findOne(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = await this.prisma.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Department user not found");
    }

    const res: ResponseSingle<any> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_department_user>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = await this.prisma.getTenantDB(business_unit_id);
    const max = await this.db_tenant.tb_department_user.count({
      where: q.where(),
    });

    const q_include = {
      ...q.findMany(),
      select: {
        id: true,
        user_id: true,
        hod: true,
        tb_department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };

    const listObj = await this.db_tenant.tb_department_user.findMany(q_include);
    const res: ResponseList<tb_department_user> = {
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

  async create(req: Request, createDto: DepartmentUserCreateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = await this.prisma.getTenantDB(business_unit_id);
    this.db_system = this.prisma.getSystemDB();

    const user = await this.db_system.tb_user.findUnique({
      where: { id: createDto.user_id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const department = await this.db_tenant.tb_department.findUnique({
      where: { id: createDto.department_id },
    });

    if (!department) {
      throw new NotFoundException("Department not found");
    }

    const found = await this.db_tenant.tb_department_user.findUnique({
      where: {
        department_id_user_id: {
          user_id: createDto.user_id,
          department_id: createDto.department_id,
        },
      },
    });

    if (found) {
      throw new DuplicateException("Department user already exists");
    }

    const createObj = await this.db_tenant.tb_department_user.create({
      data: {
        ...createDto,
      },
    });

    const response: ResponseId<string> = {
      id: createObj.id,
    };

    return response;
  }

  async update(req: Request, id: string, updateDto: DepartmentUserUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = await this.prisma.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Department user not found");
    }

    if (updateDto.user_id) {
      const user = await this.db_system.tb_user.findUnique({
        where: { id: updateDto.user_id },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }
    }

    if (updateDto.department_id) {
      const department = await this.db_tenant.tb_department.findUnique({
        where: { id: updateDto.department_id },
      });

      if (!department) {
        throw new NotFoundException("Department not found");
      }
    }

    const updateObj = await this.db_tenant.tb_department_user.update({
      where: { id },
      data: updateDto,
    });

    const response: ResponseId<string> = {
      id: updateObj.id,
    };

    return response;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = await this.prisma.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Department user not found");
    }

    await this.db_tenant.tb_department_user.delete({
      where: { id },
    });
  }
}
