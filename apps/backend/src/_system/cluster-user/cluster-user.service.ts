import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClientManagerService } from "../../_lib/prisma-client-manager/prisma-client-manager.service";
import {
  PrismaClient as dbSystem,
  tb_cluster_user,
  tb_user,
} from "@prisma-carmen-client-system";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import {
  ClusterUserCreateDto,
  ClusterUserUpdateDto,
} from "shared-dtos/cluster-user/cluster-user.dto";
import { DuplicateException } from "lib/utils";

@Injectable()
export class ClusterUserService {
  private db_System: dbSystem;

  constructor(
    private prisma: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ClusterUserService.name);

  async _getById(db_System: dbSystem, id: string) {
    const res = await db_System.tb_cluster_user.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        is_active: true,
        tb_cluster: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return res;
  }

  async findOne(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prisma.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("Cluster user not found");
    }

    const res: ResponseSingle<any> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_cluster_user>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prisma.getSystemDB();
    const max = await this.db_System.tb_cluster_user.count({
      where: q.where(),
    });

    const q_include = {
      ...q.findMany(),
      select: {
        id: true,
        user_id: true,
        is_active: true,
        tb_cluster: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    };

    const listObj = await this.db_System.tb_cluster_user.findMany(q_include);
    const res: ResponseList<tb_cluster_user> = {
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

  async create(req: Request, createDto: ClusterUserCreateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prisma.getSystemDB();

    const user = await this.db_System.tb_user.findUnique({
      where: {
        id: createDto.user_id,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const cluster = await this.db_System.tb_cluster.findUnique({
      where: {
        id: createDto.cluster_id,
      },
    });

    if (!cluster) {
      throw new NotFoundException("Cluster not found");
    }

    const found = await this.db_System.tb_cluster_user.findUnique({
      where: {
        user_id_cluster_id: {
          user_id: createDto.user_id,
          cluster_id: createDto.cluster_id,
        },
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "Cluster user already exists",
        id: found.id,
      });
    }

    const createObj = await this.db_System.tb_cluster_user.create({
      data: {
        user_id: createDto.user_id,
        cluster_id: createDto.cluster_id,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const response: ResponseId<string> = {
      id: createObj.id,
    };

    return response;
  }

  async update(req: Request, id: string, updateDto: ClusterUserUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prisma.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("Cluster user not found");
    }

    if (updateDto.user_id) {
      const user = await this.db_System.tb_user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }
    }

    if (updateDto.cluster_id) {
      const cluster = await this.db_System.tb_cluster.findUnique({
        where: {
          id: updateDto.cluster_id,
        },
      });

      if (!cluster) {
        throw new NotFoundException("Cluster not found");
      }
    }

    const updateObj = await this.db_System.tb_cluster_user.update({
      where: { id },
      data: updateDto,
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prisma.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("Cluster user not found");
    }

    await this.db_System.tb_cluster_user.delete({
      where: { id },
    });
  }
}
