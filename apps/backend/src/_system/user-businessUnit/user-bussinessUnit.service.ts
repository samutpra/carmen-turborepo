import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  UserBusinessUnit,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client-system';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from '@carmensoftware/shared-dtos';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';
import { UserBusinessUnitController } from './user-bussinessUnit.controller';

@Injectable()
export class UserBusinessUnitService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserBusinessUnitController.name);

  async _getById(db_System: dbSystem, id: string): Promise<UserBusinessUnit> {
    const res = await db_System.userBusinessUnit.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<UserBusinessUnit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User - BusinessUnit not found');
    }
    const res: ResponseSingle<UserBusinessUnit> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<UserBusinessUnit>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.userBusinessUnit.count({
      where: q.where(),
    });
    const listObj = await this.db_System.userBusinessUnit.findMany(
      q.findMany(),
    );

    const res: ResponseList<UserBusinessUnit> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perPage: q.perPage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perPage),
      },
    };
    return res;
  }

  async create(
    req: Request,
    createDto: UserBusinessUnitCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const found = await this.db_System.userBusinessUnit.findFirst({
      where: {
        userId: createDto.userId,
        businessunitId: createDto.businessUnitId,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User - BusinessUnit already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_System.userBusinessUnit.create({
      data: {
        ...createDto,
        createById: userId,
        createdAt: new Date(),
        updateById: userId,
        updateAt: new Date(),
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
    updateDto: UserBusinessUnitUpdateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User - BusinessUnit not found');
    }

    const updateObj = await this.db_System.userBusinessUnit.update({
      where: {
        id: id,
      },
      data: { ...updateDto, updateById: userId, updateAt: new Date() },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User - BusinessUnit not found');
    }

    await this.db_System.userBusinessUnit.delete({
      where: {
        id: id,
      },
    });
  }
}
