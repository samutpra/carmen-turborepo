import {
  ResponseId,
  ResponseList,
  ResponseSingle,
} from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import {
  ExtractReqService,
} from 'src/_lib/auth/extract-req/extract-req.service';
import {
  PrismaClientManagerService,
} from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  CreditNoteCreateDto,
  CreditNoteUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  Injectable,
  Logger,
  NotFoundException,
  Request,
} from '@nestjs/common';
import {
  PrismaClient as dbTenant,
  tb_credit_note,
} from '@prisma-carmen-client-tenant';

@Injectable()
export class CreditNoteService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(CreditNoteService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_credit_note> {
    const res = await db_tenant.tb_credit_note.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_credit_note>> {
    const { business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Credit Note not found');
    }

    const res: ResponseSingle<tb_credit_note> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_credit_note>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_credit_note.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_credit_note.findMany(q.findMany());

    const res: ResponseList<tb_credit_note> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perPage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  async create(req: Request, createDto: CreditNoteCreateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    // const found = await this.db_tenant.credit_note_table.findUnique({
    // 	where: {
    // 		inventory_transaction_id: createDto.inventory_transaction_id
    // 	}
    // });

    // if (found) {
    // 	throw new DuplicateException({
    // 		statusCode: HttpStatus.CONFLICT,
    // 		message: 'Credit Note already exists',
    // 		id: found.id
    // 	});
    // }

    const createdObj = await this.db_tenant.tb_credit_note.create({
      data: {
        ...createDto,
        inventory_transaction_id: createDto.inventory_transaction_id,
        created_by_id: user_id,
        updated_by_id: user_id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: createdObj.id,
    };
    return res;
  }

  async update(req: Request, id: string, updateDto: CreditNoteUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Credit Note not found');
    }

    const updatedObj = await this.db_tenant.tb_credit_note.update({
      where: { id },
      data: { ...updateDto, updated_by_id: user_id, updated_at: new Date() },
    });

    const res: ResponseId<string> = {
      id: updatedObj.id,
    };
    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Credit Note not found');
    }

    await this.db_tenant.tb_credit_note.delete({
      where: { id },
    });
  }
}
