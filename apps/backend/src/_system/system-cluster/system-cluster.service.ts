import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import { DuplicateException } from "lib/utils/exceptions";
import { ClusterCreateDto, ClusterUpdateDto } from "shared-dtos";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";

import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  PrismaClient as dbSystem,
  tb_cluster,
} from "@prisma-carmen-client-system";

@Injectable()
export class SystemClusterService {
  private db_System: dbSystem;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemClusterService.name);

  async _getById(db_System: dbSystem, id: string): Promise<tb_cluster> {
    const res = await db_System.tb_cluster.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<tb_cluster>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("Cluster not found");
    }
    const res: ResponseSingle<tb_cluster> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_cluster>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const max = await this.db_System.tb_cluster.count({
      where: q.where(),
    });

    const listObj = await this.db_System.tb_cluster.findMany(q.findMany());

    const res: ResponseList<tb_cluster> = {
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
    createDto: ClusterCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();

    const found = await this.db_System.tb_cluster.findUnique({
      where: {
        code: createDto.code,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "cluster already exists",
        id: found.id,
      });
    }

    const createObj = await this.db_System.tb_cluster.create({
      data: {
        ...createDto,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: createObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateDto: ClusterUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("Cluster not found");
    }

    if (oneObj.code !== updateDto.code) {
      const found = await this.db_System.tb_cluster.findUnique({
        where: {
          code: updateDto.code,
        },
      });
      if (found) {
        throw new DuplicateException({
          statusCode: HttpStatus.CONFLICT,
          message: `cluster [code : ${updateDto.code}] already exists`,
          id: found.id,
        });
      }
    }

    const updateObj = await this.db_System.tb_cluster.update({
      where: {
        id: id,
      },
      data: { ...updateDto, updated_by_id: user_id, updated_at: new Date() },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("Cluster not found");
    }

    const isActiveBUs = await this.db_System.tb_business_unit.count({
      where: {
        cluster_id: id,
      },
    });

    if (isActiveBUs > 0) {
      throw new BadRequestException("Cluster is in use");
    }

    const res = await this.db_System.tb_cluster.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Cluster deleted successfully",
      id: res.id,
    };
  }
}
