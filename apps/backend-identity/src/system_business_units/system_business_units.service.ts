import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { tb_business_unit } from '@prisma/client';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import {
  BusinessUnitCreateDto,
  BusinessUnitUpdateDto,
} from 'shared-dtos/business-unit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SystemBusinessUnitsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(SystemBusinessUnitsService.name);

  async _getById(id: string): Promise<tb_business_unit> {
    const res = await this.prismaService.tb_business_unit.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string) {
    const oneObj = await this._getById(id);
    if (!oneObj) {
      throw new NotFoundException('Business unit not found');
    }
    const res: ResponseSingle<tb_business_unit> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(req: Request, q: QueryParams) {
    const max = await this.prismaService.tb_business_unit.count({
      where: q.where(),
    });

    const listObj = await this.prismaService.tb_business_unit.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_business_unit> = {
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

  async create(req: Request, createDto: BusinessUnitCreateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found_business_unit =
      await this.prismaService.tb_business_unit.findUnique({
        where: {
          cluster_id_code: {
            cluster_id: createDto.cluster_id,
            code: createDto.code,
          },
        },
      });

    if (found_business_unit) {
      throw new DuplicateException({
        message: 'Business unit already exists',
        id: found_business_unit.id,
      });
    }

    const createObj = await this.prismaService.tb_business_unit.create({
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

  async update(req: Request, id: string, updateDto: BusinessUnitUpdateDto) {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const found = await this._getById(id);

    if (!found) {
      throw new NotFoundException('Business unit not found');
    }

    if (updateDto.cluster_id == null) {
      updateDto.cluster_id = found.cluster_id;
    }

    if (updateDto.code == null) {
      updateDto.code = found.code;
    }

    // check duplicate
    if (
      found.cluster_id != updateDto.cluster_id &&
      found.code == updateDto.code
    ) {
      const found_business_unit =
        await this.prismaService.tb_business_unit.findUnique({
          where: {
            cluster_id_code: {
              cluster_id: updateDto.cluster_id,
              code: updateDto.code,
            },
          },
        });

      if (found_business_unit) {
        throw new DuplicateException({
          message: 'Business unit already exists',
          id: found_business_unit.id,
        });
      }
    }
    const updateObj = await this.prismaService.tb_business_unit.update({
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
      throw new NotFoundException('Business unit not found');
    }

    await this.prismaService.tb_business_unit.delete({
      where: { id },
    });

    const res: ResponseId<string> = {
      id: id,
    };

    return res;
  }
}
