import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import {
  UserProfileCreateDto,
  UserProfileUpdateDto,
} from '@carmensoftware/shared-dtos';
import {
  PrismaClient as dbSystem,
  user_profile_table,
} from '@prisma-carmen-client-system';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class UserProfileService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(UserProfileService.name);

  async _getById(db_System: dbSystem, id: string): Promise<user_profile_table> {
    const res = await db_System.user_profile_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<user_profile_table>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('UserProfile not found');
    }
    const res: ResponseSingle<user_profile_table> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<user_profile_table>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.user_profile_table.count({
      where: q.where(),
    });

    const listObj = await this.db_System.user_profile_table.findMany(
      q.findMany(),
    );

    const res: ResponseList<user_profile_table> = {
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
    createDto: UserProfileCreateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();

    const found = await this.db_System.user_profile_table.findFirst({
      where: {
        userId: createDto.userId,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'UserProfile already exists',
        id: found.id,
      });
    }

    const createObj = await this.db_System.user_profile_table.create({
      data: {
        firstname: createDto.firstname,
        lastname: createDto.lastname,
        middlename: createDto.middlename,
        userId: createDto.userId,
        // bio: createDto.bio,
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
    updateDto: UserProfileUpdateDto,
  ): Promise<ResponseId<string>> {
    const { userId, tenantId } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('UserProfile not found');
    }

    const updateObj = await this.db_System.user_profile_table.update({
      where: {
        id: id,
      },
      data: {
        firstname: updateDto.firstname,
        lastname: updateDto.lastname,
        middlename: updateDto.middlename,
        userId: updateDto.userId,
        // bio: updateDto.bio,
        updateById: userId,
        updateAt: new Date(),
      },
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
      throw new NotFoundException('UserProfile not found');
    }

    await this.db_System.user_profile_table.delete({
      where: {
        id: id,
      },
    });
  }
}
