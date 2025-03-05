import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { tb_user } from '@prisma/client';
import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils';
import { UserCreateDto, UserUpdateDto } from 'shared-dtos';
import {PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
@Injectable()
export class SystemUsersService {
  constructor(
    private prismaService: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(SystemUsersService.name);
  
  async _getById(id: string) {
    const user = await this.prismaService.tb_user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prismaService.tb_user.findFirst({
      where: {
        username,
      },
    });
    return user;
  }

  async findAll(req: Request, q: QueryParams): Promise<ResponseList<tb_user>> {
    this.logger.log({ q });

    const max = await this.prismaService.tb_user.count({
      where: q.where(),
    });

    const listObj = await this.prismaService.tb_user.findMany(q.findMany());

    const res: ResponseList<tb_user> = {
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

  async findOne(req: Request, id: string) : Promise<ResponseSingle<tb_user>>{
    const oneObj = await this._getById(id);
    if (!oneObj) {
      throw new NotFoundException('User not found');
    }
    return {
      data: oneObj,
    };
  } 

  async create(
    req: Request,
    createDto: UserCreateDto,
  ): Promise<ResponseId<string>> {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const foundUser = await this.findByUsername(createDto.username);
    if (foundUser) {
      throw new DuplicateException({
        message: 'Username already exists',
        field: 'username',
        id: foundUser.id,
      });
    }
    const createObj = await this.prismaService.tb_user.create({
      data: {...createDto,
        consent_at: createDto.is_consent ? new Date() : null,
        created_by_id: current_user_id,
        created_at: new Date(),
        updated_by_id: current_user_id,
        updated_at: new Date(),
      },
    });
    return {
      id: createObj.id,
    };
  }

  async update(
    req: Request,
    id: string,
    updateDto: UserUpdateDto,
  ): Promise<ResponseId<string>> {
    const jwt = req.headers['authorization'].split(' ')[1];
    const supabase = this.supabaseService.SupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser(jwt);

    const current_user_id = user.id;

    const oneObj = await this._getById(id);
    if (!oneObj) {
      throw new NotFoundException('User not found');
    }

    const updateObj = await this.prismaService.tb_user.update({
      where: { id },
      data: {
        ...updateDto,
        updated_by_id: current_user_id,
        updated_at: new Date(),
      },
    });

    return {
      id: updateObj.id,
    };
  }

  async delete(req: Request, id: string): Promise<ResponseId<string>> {
    // const jwt = req.headers['authorization'].split(' ')[1];
    // const supabase = this.supabaseService.SupabaseClient();
    // const {
    //     data: { user },
    // } = await supabase.auth.getUser(jwt);

    const oneObj = await this._getById(id); 
    if (!oneObj) {
      throw new NotFoundException('User not found');
    }

    await this.prismaService.tb_user.delete({
      where: { id },
    });

    return {
      id: oneObj.id,
    };
  }
}
