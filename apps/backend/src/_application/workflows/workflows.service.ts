import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  PrismaClient as dbTenant,
  tb_workflow,
} from "@prisma-carmen-client-tenant";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import {
  WorkflowCreateDto,
  WorkflowUpdateDto,
} from "shared-dtos/workflows/workflows.dto";
import { DuplicateException } from "lib/utils";

@Injectable()
export class WorkflowsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(WorkflowsService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<any> {
    this.logger.debug({
      file: WorkflowsService.name,
      function: this._getById.name,
    });

    const res = await db_tenant.tb_workflow.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        workflow_type: true,
        description: true,
        data: true,
        is_active: true,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string) {
    this.logger.debug({
      file: WorkflowsService.name,
      function: this.findOne.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Workflow not found");
    }

    const res: ResponseSingle<tb_workflow> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request, q: QueryParams) {
    this.logger.debug({
      file: WorkflowsService.name,
      function: this.findAll.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_workflow.count({
      where: q.where(),
    });

    const include = {
      ...q.findMany(),
      select: {
        id: true,
        name: true,
        workflow_type: true,
        description: true,
        data: true,
        is_active: true,
      },
    };

    const listObj = await this.db_tenant.tb_workflow.findMany(include);

    const res: ResponseList<tb_workflow> = {
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

  async create(req: Request, createDto: WorkflowCreateDto) {
    this.logger.debug({
      file: WorkflowsService.name,
      function: this.create.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_workflow.findFirst({
      where: {
        AND: [
          { name: createDto.name },
          { workflow_type: createDto.workflow_type },
        ],
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "Workflow already exists",
        data: found.id,
      });
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const workflowObj: any = {
        name: createDto.name,
        workflow_type: createDto.workflow_type,
        description: createDto.description,
        data: createDto.data,
        is_active: createDto.is_active,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.debug(workflowObj);

      const createObj = await transactionClient.tb_workflow.create({
        data: {
          ...workflowObj,
        },
      });

      const res: ResponseId<string> = { id: createObj.id };
      return res;
    });

    return tx;
  }

  async update(req: Request, id: string, updateDto: WorkflowUpdateDto) {
    this.logger.debug({
      file: WorkflowsService.name,
      function: this.update.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Workflow not found");
    }

    const found = await this.db_tenant.tb_workflow.findFirst({
      where: {
        AND: [
          { name: updateDto.name ?? oneObj.name },
          { workflow_type: updateDto.workflow_type ?? oneObj.workflow_type },
        ],
        NOT: {
          id: id,
        },
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "Workflow already exists",
        data: found.id,
      });
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const workflowOld = await this._getById(this.db_tenant, id);

      this.logger.debug(workflowOld);

      const workflowUpdateObj: any = {
        name: updateDto.name ?? workflowOld.name,
        workflow_type: updateDto.workflow_type ?? workflowOld.workflow_type,
        description: updateDto.description ?? workflowOld.description,
        data: updateDto.data ?? workflowOld.data,
        is_active: updateDto.is_active ?? workflowOld.is_active,
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.debug(workflowUpdateObj);

      await transactionClient.tb_workflow.update({
        where: { id: id },
        data: workflowUpdateObj,
      });

      const res: ResponseId<string> = { id: id };
      return res;
    });

    return tx;
  }

  async delete(req: Request, id: string) {
    this.logger.debug({
      file: WorkflowsService.name,
      function: this.delete.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Workflow not found");
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      await transactionClient.tb_workflow.delete({
        where: { id: id },
      });
    });

    return tx;
  }
}
