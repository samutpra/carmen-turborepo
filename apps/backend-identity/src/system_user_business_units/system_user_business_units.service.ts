import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { tb_user_tb_business_unit } from '@prisma/client';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from 'shared-dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
@Injectable()
export class SystemUserBusinessUnitsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(SystemUserBusinessUnitsService.name);

  async _getById(id: string): Promise<tb_user_tb_business_unit> {
    const res = await this.prismaService.tb_user_tb_business_unit.findUnique({
      where: {
        id: id,
      },
      include: {
        tb_business_unit: {
          select: {
            cluster_id: true,
            code: true,
            name: true,
            is_hq: true,
            is_active: true,
          },
        },

        // tb_user: {
        //   select: {
        //     username: true,
        //     email: true,
        //     is_active: true,
        //   },
        // },
      },
    });
    return res;
  }

  async findOne(req: Request, id: string) {
    const oneObj = await this._getById(id);
    if (!oneObj) {
      throw new NotFoundException('User business unit not found');
    }
    const res: ResponseSingle<tb_user_tb_business_unit> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request, q: QueryParams) {
    const max = await this.prismaService.tb_user_tb_business_unit.count({
      where: q.where(),
    });

    const q_include = {
      ...q.findMany(),
      include: {
        tb_business_unit: {
          select: {
            cluster_id: true,
            code: true,
            name: true,
            is_hq: true,
            is_active: true,
          },
        },
        tb_user_tb_user_tb_business_unit_user_idTotb_user: {
          select: {
            username: true,
            email: true,
            is_active: true,
          },
        },
      },
    };

    const listObj = await this.prismaService.tb_user_tb_business_unit.findMany(
      q_include, // q.findMany(),
    );

    const newFormatListObj = listObj.map((item: any) => {
      return {
        id: item.id,
        user: {
          id: item.user_id,
          username:
            item.tb_user_tb_user_tb_business_unit_user_idTotb_user.username,
          email: item.tb_user_tb_user_tb_business_unit_user_idTotb_user.email,
        },
        business_unit: {
          id: item.business_unit_id,
          code: item.tb_business_unit.code,
          name: item.tb_business_unit.name,
          is_hq: item.tb_business_unit.is_hq,
        },
      };
    });

    const res: ResponseList<any> = {
      data: newFormatListObj,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  async create(req: Request, createDto: UserBusinessUnitCreateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found_user_business_unit =
      await this.prismaService.tb_user_tb_business_unit.findUnique({
        where: {
          user_id_business_unit_id: {
            user_id: createDto.user_id,
            business_unit_id: createDto.business_unit_id,
          },
        },
      });

    if (found_user_business_unit) {
      throw new DuplicateException({
        message: 'User business unit already exists',
        id: found_user_business_unit.id,
      });
    }

    const createObj = await this.prismaService.tb_user_tb_business_unit.create({
      data: {
        ...createDto,
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

  async update(req: Request, id: string, updateDto: UserBusinessUnitUpdateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found = await this._getById(id);

    if (!found) {
      throw new NotFoundException('User business unit not found');
    }

    const updateObj = await this.prismaService.tb_user_tb_business_unit.update({
      where: { id },
      data: {
        ...updateDto,
        updated_by_id: current_user_id,
        updated_at: new Date(),
      },
    });

    const res: ResponseId<string> = {
      id: updateObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    // const jwt = req.headers['authorization'].split(' ')[1];
    // const supabase = this.supabaseService.SupabaseClient();
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser(jwt);

    // const current_user_id = user.id;

    const found = await this._getById(id);

    if (!found) {
      throw new NotFoundException('User business unit not found');
    }

    await this.prismaService.tb_user_tb_business_unit.delete({
      where: { id },
    });

    const res: ResponseId<string> = {
      id: id,
    };

    return res;
  }
}
