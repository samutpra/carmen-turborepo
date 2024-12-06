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
  credit_note_table,
  PrismaClient as dbTenant,
} from '@prisma-carmen-client-tenant';

@Injectable()
export class CreditNoteService {
	private db_tenant: dbTenant;

	constructor(private prismaClientManager: PrismaClientManagerService, private extractReqService: ExtractReqService) {}

	logger = new Logger(CreditNoteService.name);

	async _getById(db_tenant: dbTenant, id: string): Promise<credit_note_table> {
		const res = await db_tenant.credit_note_table.findUnique({
			where: {
				id: id
			}
		});
		return res;
	}

	async findOne(req: Request, id: string): Promise<ResponseSingle<credit_note_table>> {
		const { business_unit_id } = this.extractReqService.getByReq(req);
		this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);
		const oneObj = await this._getById(this.db_tenant, id);

		if (!oneObj) {
			throw new NotFoundException('Credit Note not found');
		}

		const res: ResponseSingle<credit_note_table> = {
			data: oneObj
		};
		return res;
	}

	async findAll(req: Request, q: QueryParams): Promise<ResponseList<credit_note_table>> {
		const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
		this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

		const max = await this.db_tenant.credit_note_table.count({
			where: q.where()
		});

		const listObj = await this.db_tenant.credit_note_table.findMany(q.findMany());

		const res: ResponseList<credit_note_table> = {
			data: listObj,
			pagination: {
				total: max,
				page: q.page,
				perPage: q.perPage,
				pages:

						max == 0 ? 1 :
						Math.ceil(max / q.perPage)
			}
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

		const createdObj = await this.db_tenant.credit_note_table.create({
			data: {
				...createDto,
				inventory_transaction_id: createDto.inventory_transaction_id,
				created_by_id: user_id,
				updated_by_id: user_id,
				created_at: new Date(),
				updated_at: new Date()
			}
		});

		const res: ResponseId<string> = {
			id: createdObj.id
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

		const updatedObj = await this.db_tenant.credit_note_table.update({
			where: { id },
			data: { ...updateDto, updated_by_id: user_id, updated_at: new Date() }
		});

		const res: ResponseId<string> = {
			id: updatedObj.id
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

		await this.db_tenant.credit_note_table.delete({
			where: { id }
		});
	}
}
