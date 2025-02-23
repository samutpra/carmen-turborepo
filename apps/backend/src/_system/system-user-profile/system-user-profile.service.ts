import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import { DuplicateException } from "lib/utils/exceptions";
import { UserProfileCreateDto, UserProfileUpdateDto } from "shared-dtos";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  PrismaClient as dbSystem,
  tb_user_profile,
} from "@prisma-carmen-client-system";

@Injectable()
export class SystemUserProfileService {
  private db_System: dbSystem;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(SystemUserProfileService.name);

  async _getById(db_System: dbSystem, id: string): Promise<tb_user_profile> {
    const res = await db_System.tb_user_profile.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_user_profile>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("UserProfile not found");
    }
    const res: ResponseSingle<tb_user_profile> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_user_profile>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const max = await this.db_System.tb_user_profile.count({
      where: q.where(),
    });

    const listObj = await this.db_System.tb_user_profile.findMany(q.findMany());

    const res: ResponseList<tb_user_profile> = {
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
    createDto: UserProfileCreateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();

    const found = await this.db_System.tb_user_profile.findFirst({
      where: {
        user_id: createDto.user_id,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "UserProfile already exists",
        id: found.id,
      });
    }

    const createObj = await this.db_System.tb_user_profile.create({
      data: {
        firstname: createDto.firstname,
        lastname: createDto.lastname,
        middlename: createDto.middlename,
        user_id: createDto.user_id,
        // bio: createDto.bio,

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
    updateDto: UserProfileUpdateDto,
  ): Promise<ResponseId<string>> {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("UserProfile not found");
    }

    const updateObj = await this.db_System.tb_user_profile.update({
      where: {
        id: id,
      },
      data: {
        firstname: updateDto.firstname,
        lastname: updateDto.lastname,
        middlename: updateDto.middlename,
        user_id: updateDto.user_id,
        // bio: updateDto.bio,
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_System = this.prismaClientManager.getSystemDB();
    const oneObj = await this._getById(this.db_System, id);

    if (!oneObj) {
      throw new NotFoundException("UserProfile not found");
    }

    await this.db_System.tb_user_profile.delete({
      where: {
        id: id,
      },
    });
  }
}
