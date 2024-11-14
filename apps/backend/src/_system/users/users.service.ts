import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { User, PrismaClient as dbSystem } from '@prisma-carmen-client-system';
import { UserCreateDto, UserUpdateDto } from '@carmensoftware/shared-dtos';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class UsersService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UsersService.name);

  async _getById(db_System: dbSystem, id: string): Promise<User> {
    const res = await db_System.user.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findByUsername(db_System: dbSystem, username: string): Promise<User> {
    const res = await db_System.user.findFirst({
      where: {
        username: username,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<User>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }
    const res: ResponseSingle<User> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request, q: QueryParams): Promise<ResponseList<User>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.user.count({
      where: q.where(),
    });
    const listObj = await this.db_System.user.findMany(q.findMany());

    const res: ResponseList<User> = {
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
    createDto: UserCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.user.findUnique({
      where: {
        username: createDto.username,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_System.user.create({
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
    updateDto: UserUpdateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }

    const updateObj = await this.db_System.user.update({
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
      throw new NotFoundException('User not found');
    }

    await this.db_System.user.delete({
      where: {
        id: id,
      },
    });
  }
}
