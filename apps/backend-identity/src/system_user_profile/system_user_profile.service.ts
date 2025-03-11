import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { tb_user_profile } from '@prisma/client';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SystemUserProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(SystemUserProfileService.name);

  async _getById(id: string): Promise<tb_user_profile> {
    return this.prismaService.tb_user_profile.findUnique({
      where: { id },
    });
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_user_profile>> {
    const oneObj = await this._getById(id);
    if (!oneObj) {
      throw new NotFoundException('User not found');
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
    const max = await this.prismaService.tb_user_profile.count({
      where: q.where(),
    });

    const listObj = await this.prismaService.tb_user_profile.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_user_profile> = {
      data: listObj,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  async create(
    req: Request,
    createDto: tb_user_profile,
  ): Promise<ResponseId<string>> {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found = await this.prismaService.tb_user_profile.findFirst({
      where: {
        user_id: createDto.user_id,
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'User profile already exists',
        id: found.id,
      });
    }

    const createObj = await this.prismaService.tb_user_profile.create({
      data: {
        firstname: createDto.firstname,
        lastname: createDto.lastname,
        middlename: createDto.middlename,
        user_id: createDto.user_id,

        created_by_id: current_user_id,
        created_at: new Date(),
        updated_by_id: current_user_id,
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
    updateDto: tb_user_profile,
  ): Promise<ResponseId<string>> {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const oneObj = await this._getById(id);

    if (!oneObj) {
      throw new NotFoundException('User profile not found');
    }

    const updateObj = await this.prismaService.tb_user_profile.update({
      where: { id: id },
      data: {
        firstname: updateDto.firstname,
        lastname: updateDto.lastname,
        middlename: updateDto.middlename,
        user_id: updateDto.user_id,

        updated_by_id: current_user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };
    return res;
  }

  async delete(req: Request, id: string): Promise<ResponseId<string>> {
    // const jwt = req.headers['authorization'].split(' ')[1];
    // const supabase = this.supabaseService.SupabaseClient();
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser(jwt);

    // const current_user_id = user.id;

    const oneObj = await this._getById(id);

    if (!oneObj) {
      throw new NotFoundException('User profile not found');
    }

    const deleteObj = await this.prismaService.tb_user_profile.delete({
      where: { id: id },
    });

    const res: ResponseId<string> = {
      id: deleteObj.id,
    };
    return res;
  }
}
