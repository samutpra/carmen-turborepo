import 'dotenv/config';

import {
  AuthLoginResponseDto,
  AuthPayloadDto,
} from '@carmensoftware/shared-dtos';
import {
  DuplicateException,
  ForbiddenException,
  InvalidTokenException,
  NullException,
} from 'lib/utils/exceptions';
import {
  EmailDto,
  UserForgotPassDto,
  UserRegisterDto,
} from '@carmensoftware/shared-dtos';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';
import { comparePassword, hashPassword } from 'lib/utils/password';
import {
  PrismaClient as dbSystem,
  user_table,
} from '@prisma-carmen-client-system';

import { JwtService } from '@nestjs/jwt';
import { PrismaClientManagerService } from '../prisma-client-manager/prisma-client-manager.service';
import { UsersService } from 'src/_system/users/users.service';
import { isWelformJWT } from '../../../lib/utils/functions';

@Injectable()
export class AuthService {
  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private db_System: dbSystem;

  private readonly logger = new Logger(AuthService.name);

  async checkToken(token: string, req: any): Promise<ResponseSingle<object>> {
    const isWelformJWT_ = isWelformJWT(token);

    if (!isWelformJWT_) {
      throw new InvalidTokenException('Invalid token');
    }

    const payload = this.jwtService.decode(token);

    if (!payload) {
      throw new InvalidTokenException('Invalid token');
    }

    const isTokenValid = this.jwtService.verify(token);
    let isValid = true;

    if (!isTokenValid) {
      isValid = false;
    }

    const now = Math.floor(Date.now() / 1000);

    const res: any = {
      data: {
        ...payload,
        isTokenValid: isValid,
        isExpired: now <= payload.exp,
      },
    };

    return res;
  }

  async forgotPasswordEmail(
    userForgotPassDto: EmailDto,
    req: any,
  ): Promise<ResponseSingle<string>> {
    this.db_System = this.prismaClientMamager.getSystemDB();

    this.logger.debug(userForgotPassDto);
    const u = await this.usersService.findByUsername(
      this.db_System,
      userForgotPassDto.email,
    );

    if (!u) {
      throw new NotFoundException('User not found');
    }

    const { ...payload } = {
      type: 'forgotpassword',
      username: u.username,
      email: u.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.EMAIL_FORGOT_PASSWORD_EXPIRES_IN || '1h',
    });

    // this.sendEmail.sendMailForgotPassword(user.username, token);

    const res: ResponseSingle<string> = {
      data: token,
    };

    return res;
  }

  async forgotPasswordConfirm(
    userForgotPassDto: UserForgotPassDto,
    req: any,
  ): Promise<ResponseId<string>> {
    const isWelformJWT_ = isWelformJWT(userForgotPassDto.emailToken);

    if (!isWelformJWT_) {
      throw new InvalidTokenException('Invalid token');
    }

    const payload = this.jwtService.verify(userForgotPassDto.emailToken);

    if (!payload) {
      throw new InvalidTokenException('Invalid token');
    }

    if (payload.username !== userForgotPassDto.username) {
      throw new InvalidTokenException('Invalid token');
    }

    this.db_System = this.prismaClientMamager.getSystemDB();
    const user = await this.usersService.findByUsername(
      this.db_System,
      userForgotPassDto.username,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.db_System.password_table.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        isActive: false,
      },
    });

    const passObj = await this.db_System.password_table.create({
      data: {
        userId: user.id,
        hash: hashPassword(userForgotPassDto.password),
        isActive: true,
      },
    });

    const res: ResponseId<string> = {
      id: user.id,
    };

    return res;
  }

  async registerEmail(
    userRegisterEmailDto: EmailDto,
    req: Request,
  ): Promise<ResponseSingle<string>> {
    if (
      userRegisterEmailDto.email === null ||
      userRegisterEmailDto.email === undefined ||
      userRegisterEmailDto.email === ''
    ) {
      throw new NullException();
    }

    this.logger.debug(userRegisterEmailDto);

    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.usersService.findByUsername(
      this.db_System,
      userRegisterEmailDto.email,
    );

    this.logger.debug(found);

    if (found) {
      throw new DuplicateException('User already exists');
    }

    const { ...payload }: object = {
      type: 'register',
      username: userRegisterEmailDto.email,
      email: userRegisterEmailDto.email,
    };

    console.log(payload);

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.EMAIL_REGISTER_CONFIRM_EXPIRES_IN || '1h',
    });

    // this.sendEmail.sendMailRegister(userRegisterEmailDto.email, token);

    const res: ResponseSingle<string> = {
      data: token,
    };
    return res;
  }

  async registerConfirm(
    userRegisterDto: UserRegisterDto,
    req: Request,
  ): Promise<ResponseId<string>> {
    const isWelformJWT_ = isWelformJWT(userRegisterDto.emailToken);

    if (!isWelformJWT_) {
      throw new InvalidTokenException('Invalid token');
    }

    const payload = this.jwtService.verify(userRegisterDto.emailToken);

    if (!payload) {
      throw new InvalidTokenException('Invalid token');
    }

    if (
      payload.username !== userRegisterDto.username ||
      payload.email !== userRegisterDto.email
    ) {
      throw new InvalidTokenException('Invalid token');
    }

    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.usersService.findByUsername(
      this.db_System,
      userRegisterDto.username,
    );

    if (found) {
      throw new DuplicateException('User already exists');
    }

    const createUserObj = await this.db_System.user_table.create({
      data: {
        username: userRegisterDto.username,
        email: userRegisterDto.email,
      },
    });

    const passObj = await this.db_System.password_table.create({
      data: {
        userId: createUserObj.id,
        hash: hashPassword(userRegisterDto.password),
        isActive: true,
      },
    });

    const userInfoObj = await this.db_System.user_profile_table.create({
      data: {
        userId: createUserObj.id,
        firstname: userRegisterDto.userInfo.firstName || '',
        middlename: userRegisterDto.userInfo.middleName || '',
        lastname: userRegisterDto.userInfo.lastName || '',
        // bio: userRegisterDto.userInfo.bio,
      },
    });

    const res: ResponseId<string> = {
      id: createUserObj.id,
    };

    return res;
  }

  async validateUser({ username, password }: AuthPayloadDto) {
    this.db_System = this.prismaClientMamager.getSystemDB();
    const findUser = await this.usersService.findByUsername(
      this.db_System,
      username,
    );

    if (!findUser) return null;

    const lastPassword = await this.db_System.password_table.findFirst({
      where: {
        userId: findUser.id,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const isMatch = comparePassword(password, lastPassword.hash);

    if (isMatch) {
      const { consent, createdAt, createById, updateAt, updateById, ...user } =
        findUser;

      const res = {
        id: findUser.id,
        username: user.username,
        access_token: this.jwtService.sign(user),
        refresh_token: this.jwtService.sign(user, {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        }),
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
