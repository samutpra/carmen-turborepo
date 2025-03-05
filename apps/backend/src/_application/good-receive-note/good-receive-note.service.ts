import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  PrismaClient as dbTenant,
  tb_good_receive_note,
  tb_inventory_transaction,
} from '@prisma/client';
import { ResponseSingle, ResponseList, ResponseId } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import {
  GoodReceiveNoteCreateDto,
  GoodReceiveNoteUpdateDto,
} from 'shared-dtos';
import { DuplicateException } from 'lib/utils/exceptions';

@Injectable()
export class GoodReceiveNoteService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(GoodReceiveNoteService.name);

  async _getById(
    db_tenant: dbTenant,
    id: string,
  ): Promise<tb_good_receive_note> {
    const res = await db_tenant.tb_good_receive_note.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_good_receive_note>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('GoodReceiveNote not found');
    }
    const res: ResponseSingle<tb_good_receive_note> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_good_receive_note>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_good_receive_note.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_good_receive_note.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_good_receive_note> = {
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
    createDto: GoodReceiveNoteCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    console.log(createDto);

    const found = await this.db_tenant.tb_good_receive_note.findFirst({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'GoodReceiveNote already exists',
        id: found.id,
      });
    }

    const transaction = await this.db_tenant.$transaction(async (tx) => {
      const inv_transaction = await tx.tb_inventory_transaction.create({
        data: {
          created_by_id: user_id,
          created_at: new Date(),
          updated_by_id: user_id,
          updated_at: new Date(),
          inventory_doc_type: 'good_receive_note',
        },
      });

      const createObj = await tx.tb_good_receive_note.create({
        data: {
          ...createDto,
          created_by_id: user_id,
          created_at: new Date(),
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      return createObj;
    });

    const res: ResponseId<string> = { id: transaction.id };
    return res;
  }

  async update(req: Request, id: string, updateDto: GoodReceiveNoteUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('GoodReceiveNote not found');
    }

    const updateObj = await this.db_tenant.tb_good_receive_note.update({
      where: { id },
      data: { ...updateDto, updated_by_id: user_id, updated_at: new Date() },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('GoodReceiveNote not found');
    }

    await this.db_tenant.tb_good_receive_note.delete({
      where: {
        id,
      },
    });
  }
}
