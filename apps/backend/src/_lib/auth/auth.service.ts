import {
  AuthLoginResponseDto,
  AuthPayloadDto,
} from '@carmensoftware/shared-dtos';
import { User, PrismaClient as dbSystem } from '@prisma-carmen-client-system';
import { comparePassword, hashPassword } from 'lib/utils/password';

import { DuplicateException } from 'lib/utils/exceptions';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientManagerService } from '../prisma-client-manager/prisma-client-manager.service';
import { ResponseId } from 'lib/helper/iResponse';
import { UserRegisterDto } from './auth.dto';
import { UsersService } from 'src/_system/users/users.service';

// const fakeUsers = [
//   {
//     id: '0438ff44-754f-42bd-95b5-53aae20dec3e',
//     username: 'test1',
//     password: 'password1',
//     passwordHash: hashPassword('password1'),
//   },
//   {
//     id: 'c69826b9-1a25-4109-8320-ca72241e58ac',
//     username: 'test2',
//     password: 'password2',
//     passwordHash: hashPassword('password2'),
//   },
// ];

@Injectable()
export class AuthService {
  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private jwtService: JwtService,
  ) {}

  private db_System: dbSystem;

  async register(
    userRegisterDto: UserRegisterDto,
    req: Request,
  ): Promise<ResponseId<string>> {
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.db_System.user.findUnique({
      where: {
        username: userRegisterDto.username,
      },
    });

    if (found) {
      throw new DuplicateException('User already exists');
    }

    const createUserObj = await this.db_System.user.create({
      data: {
        username: userRegisterDto.username,
      },
    });

    const passObj = await this.db_System.password.create({
      data: {
        userId: createUserObj.id,
        hash: hashPassword(userRegisterDto.password),
      },
    });

    const res: ResponseId<string> = {
      id: createUserObj.id,
    };

    return res;
  }

  async validateUser({
    username,
    password,
  }: AuthPayloadDto): Promise<AuthLoginResponseDto> {
    const findUser = await this.db_System.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!findUser) return null;

    const lastPassword = await this.db_System.password.findFirst({
      where: {
        userId: findUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const isMatch = comparePassword(password, lastPassword.hash);

    if (isMatch) {
      const { ...user } = findUser;

      const res: AuthLoginResponseDto = {
        id: findUser.id,
        username: user.username,
        access_token: this.jwtService.sign(user),
        refresh_token: this.jwtService.sign(user, { expiresIn: '7d' }),
      };
      return res;
    }
  }

  async refreshToken({
    id,
    username,
  }: AuthPayloadDto): Promise<AuthLoginResponseDto> {
    const payload = {
      id: id,
      username: username,
    };

    const res: AuthLoginResponseDto = {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
    return res;
  }
}
