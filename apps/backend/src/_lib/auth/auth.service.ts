import {
  AuthLoginResponseDto,
  AuthPayloadDto,
} from '@carmensoftware/shared-dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';
import { User, PrismaClient as dbSystem } from '@prisma-carmen-client-system';
import {
  UserForgotPassDto,
  UserRegisterDto,
  UserRegisterEmailDto,
} from './auth.dto';
import { comparePassword, hashPassword } from 'lib/utils/password';

import { DuplicateException } from 'lib/utils/exceptions';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientManagerService } from '../prisma-client-manager/prisma-client-manager.service';
import { SendMailService } from 'src/_lib/send-mail/send-mail.service';
import { UsersService } from 'src/_system/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaClientMamager: PrismaClientManagerService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private sendEmail: SendMailService,
  ) {}

  private db_System: dbSystem;

  async forgotPasswordEmail(
    userForgotPassDto: UserForgotPassDto,
    req: any,
  ): Promise<ResponseSingle<string>> {
    this.db_System = this.prismaClientMamager.getSystemDB();
    const user = await this.usersService.findByUsername(
      this.db_System,
      userForgotPassDto.username,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload = {
      username: user.username,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.EMAIL_FORGOT_PASSWORD_EXPIRES_IN || '1h',
    });

    this.sendEmail.sendMailForgotPassword(user.username, token);

    const res: ResponseSingle<string> = {
      data: 'please check your email',
    };

    return res;
  }

  async forgotPasswordConfirm(
    userregistrDto: UserRegisterDto,
    req: any,
  ): Promise<ResponseId<string>> {
    const payload = this.jwtService.verify(userregistrDto.emailToken);

    if (!payload) {
      throw new NotFoundException('Invalid token');
    }

    if (payload.username !== userregistrDto.username) {
      throw new NotFoundException('Invalid token');
    }

    this.db_System = this.prismaClientMamager.getSystemDB();
    const user = await this.usersService.findByUsername(
      this.db_System,
      userregistrDto.username,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passObj = await this.db_System.password.create({
      data: {
        userId: user.id,
        hash: hashPassword(userregistrDto.password),
      },
    });

    const res: ResponseId<string> = {
      id: user.id,
    };

    return res;
  }

  async registerEmail(
    userRegisterEmailDto: UserRegisterEmailDto,
    req: Request,
  ): Promise<ResponseSingle<string>> {
    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.usersService.findByUsername(
      this.db_System,
      userRegisterEmailDto.email,
    );

    if (found) {
      throw new DuplicateException('User already exists');
    }

    const payload = {
      username: userRegisterEmailDto.email,
      email: userRegisterEmailDto.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.EMAIL_REGISTER_CONFIRM_EXPIRES_IN || '1h',
    });

    this.sendEmail.sendMailRegister(userRegisterEmailDto.email, token);

    const res: ResponseSingle<string> = {
      data: 'please check your email',
    };
    return res;
  }

  async registerConfirm(
    userRegisterDto: UserRegisterDto,
    req: Request,
  ): Promise<ResponseId<string>> {
    const payload = this.jwtService.verify(userRegisterDto.emailToken);

    if (!payload) {
      throw new NotFoundException('Invalid token');
    }

    if (payload.username !== userRegisterDto.username) {
      throw new NotFoundException('Invalid token');
    }

    this.db_System = this.prismaClientMamager.getSystemDB();
    const found = await this.usersService.findByUsername(
      this.db_System,
      userRegisterDto.username,
    );

    if (found) {
      throw new DuplicateException('User already exists');
    }

    const createUserObj = await this.db_System.user.create({
      data: {
        username: userRegisterDto.username,
        email: userRegisterDto.username,
      },
    });

    const passObj = await this.db_System.password.create({
      data: {
        userId: createUserObj.id,
        hash: hashPassword(userRegisterDto.password),
      },
    });

    const userInfoObj = await this.db_System.userProfile.create({
      data: {
        userId: createUserObj.id,
        firstname: userRegisterDto.userInfo.firstname,
        middlename: userRegisterDto.userInfo.middlename,
        lastname: userRegisterDto.userInfo.lastname,
        // bio: userRegisterDto.userInfo.bio,
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
    this.db_System = this.prismaClientMamager.getSystemDB();
    const findUser = await this.usersService.findByUsername(
      this.db_System,
      username,
    );

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
