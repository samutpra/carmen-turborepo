import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { UserCreateDto, UserUpdateDto } from '@carmensoftware/shared-dtos';
import {
  PrismaClient as dbSystem,
  user_table,
} from '@prisma-carmen-client-system';

import { DuplicateException } from 'lib/utils/exceptions';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import QueryParams from 'lib/types';

@Injectable()
export class SystemUsersService {
  private db_System: dbSystem;

  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemUsersService.name);

  async _getById(db_System: dbSystem, id: string): Promise<user_table> {
    const res = await db_System.user_table.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findByUsername(
    db_System: dbSystem,
    username: string,
  ): Promise<user_table> {
    this.logger.debug({ function: 'findByUsername', username: username });

    const res = await db_System.user_table.findFirst({
      where: {
        username: username,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<user_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }
    const res: ResponseSingle<user_table> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<user_table>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const max = await this.db_System.user_table.count({
      where: q.where(),
    });
    const listObj = await this.db_System.user_table.findMany(q.findMany());

    const res: ResponseList<user_table> = {
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
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.user_table.findUnique({
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

    const createObj = await this.db_System.user_table.create({
      data: {
        ...createDto,
        consent: createDto.is_consent ? new Date() : null,
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
    updateDto: UserUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }

    const updateObj = await this.db_System.user_table.update({
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
    this.db_System = this.prismaClientMamager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException('User not found');
    }

    //check if uses is inused
    // TODO: check if user is inused

    await this.db_System.user_table.delete({
      where: {
        id: id,
      },
    });
  }
}
