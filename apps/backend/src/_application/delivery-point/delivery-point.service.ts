import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import { DeliveryPointCreateDto, DeliveryPointUpdateDto } from 'shared-dtos';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient as dbTenant, tb_delivery_point } from '@prisma/client';

@Injectable()
export class DeliveryPointService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(DeliveryPointService.name);

  async _getById(db_tenant: dbTenant, id: string): Promise<tb_delivery_point> {
    const res = await db_tenant.tb_delivery_point.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_delivery_point>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('delivery point not found');
    }
    const res: ResponseSingle<tb_delivery_point> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_delivery_point>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_delivery_point.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_delivery_point.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_delivery_point> = {
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
    createDto: DeliveryPointCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    console.log(createDto);

    const found = await this.db_tenant.tb_delivery_point.findFirst({
      where: {
        name: createDto.name,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Delivery point already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_tenant.tb_delivery_point.create({
      data: {
        ...createDto,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = { id: createObj.id };
    return res;
  }

  async update(req: Request, id: string, updateDto: DeliveryPointUpdateDto) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Delivery point not found');
    }

    const updateObj = await this.db_tenant.tb_delivery_point.update({
      where: {
        id,
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Delivery point not found');
    }

    await this.db_tenant.tb_delivery_point.delete({
      where: {
        id,
      },
    });
  }
}
