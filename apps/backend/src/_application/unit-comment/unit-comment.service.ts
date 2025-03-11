import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClientManagerService } from '../../_lib/prisma-client-manager/prisma-client-manager.service';
import { PrismaClient as dbTenant, tb_unit_comment } from '@prisma/client';
import { PrismaClient as dbSystem } from '@prisma-carmen-client-system';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { UnitCommentCreateDto, UnitCommentUpdateDto } from 'shared-dtos';
// import {
//   UnitCommentCreateDto,
//   UnitCommentUpdateDto,
// } from "shared-dtos/unit-comment/unit-comment.dto";

@Injectable()
export class UnitCommentService {
  private db_tenant: dbTenant;
  private db_system: dbSystem;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UnitCommentService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<any> {
    this.logger.debug({
      file: UnitCommentService.name,
      function: this._getById.name,
    });
    // this.db_system = this.prismaClientManager.getSystemDB();
    const res = await db_tenant.tb_unit_comment
      .findUnique({
        where: { id },
      })
      .then(async (res) => {
        const userInfo = await this.db_system.tb_user.findMany({
          where: { id: res.user_id },
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
          ...res,
          email: userInfo[0].email,
          userInfo:
            userInfo[0].tb_user_profile_tb_user_profile_user_idTotb_user,
        };
      });

    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_unit_comment>> {
    this.logger.debug({
      file: UnitCommentService.name,
      function: this.findOne.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Unit comment not found');
    }

    const res: ResponseSingle<tb_unit_comment> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(req: Request, q: QueryParams): Promise<ResponseList<any>> {
    this.logger.debug({
      file: UnitCommentService.name,
      function: this.findAll.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    // this.db_system = this.prismaClientManager.getSystemDB();

    const max = await this.db_tenant.tb_unit_comment.count({
      where: q.where(),
    });

    const include = {
      ...q.findMany(),
    };

    const listObj = await this.db_tenant.tb_unit_comment
      .findMany(include)
      .then((res) => {
        return Promise.all(
          res.map(async (item) => {
            const userInfo = await this.db_system.tb_user.findMany({
              where: { id: item.user_id },
              select: {
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
              ...item,
              email: userInfo[0].email,
              userInfo:
                userInfo[0].tb_user_profile_tb_user_profile_user_idTotb_user,
            };
          }),
        );
      });

    const res: ResponseList<any> = {
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
    createDto: UnitCommentCreateDto,
  ): Promise<ResponseId<string>> {
    this.logger.debug({
      file: UnitCommentService.name,
      function: this.create.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const commentObj: any = {
        ...createDto,
        user_id: user_id,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.debug({ commentObj: commentObj });

      const createdComment = await transactionClient.tb_unit_comment.create({
        data: commentObj,
      });
      const res: ResponseId<string> = { id: createdComment.id };
      return res;
    });

    return tx;
  }

  async update(
    req: Request,
    id: string,
    updateDto: UnitCommentUpdateDto,
  ): Promise<ResponseId<string>> {
    this.logger.debug({
      file: UnitCommentService.name,
      function: this.update.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Unit comment not found');
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const commentObj: any = {
        ...updateDto,
        user_id: user_id,
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      const updatedComment = await transactionClient.tb_unit_comment.update({
        where: { id },
        data: commentObj,
      });

      const res: ResponseId<string> = { id: updatedComment.id };
      return res;
    });

    return tx;
  }

  async delete(req: Request, id: string): Promise<void> {
    this.logger.debug({
      file: UnitCommentService.name,
      function: this.delete.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Unit comment not found');
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      await transactionClient.tb_unit_comment.delete({ where: { id } });
    });

    return tx;
  }
}
