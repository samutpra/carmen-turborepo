import "dotenv/config";

import { ResponseId, ResponseSingle } from "lib/helper/iResponse";
import {
  DuplicateException,
  InvalidTokenException,
  NullException,
} from "lib/utils/exceptions";
import { isWelformJWT } from "lib/utils/functions";
import { comparePassword, hashPassword } from "lib/utils/password";
import {
  AuthChangePasswordDto,
  AuthLoginResponseDto,
  AuthPayloadDto,
  EmailDto,
  UserForgotPassDto,
  UserRegisterDto,
} from "shared-dtos";
import { SystemUsersService } from "src/_system/system-users/system-users.service";

import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient as dbSystem } from "@prisma-carmen-client-system";

import { PrismaClientManagerService } from "../prisma-client-manager/prisma-client-manager.service";
import { ExtractReqService } from "./extract-req/extract-req.service";

@Injectable()
export class AuthService {
  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private jwtService: JwtService,
    private systemUsersService: SystemUsersService,
    private extractReqService: ExtractReqService,
  ) {}

  private db_System: dbSystem;

  private readonly logger = new Logger(AuthService.name);

  async changePassword(userChangePassDto: AuthChangePasswordDto, req: any) {
    this.db_System = this.prismaClientManager.getSystemDB();
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);

    if (!userChangePassDto.old_pass || !userChangePassDto.new_pass) {
      throw new DuplicateException("Old and new password are required");
    }

    const lastPassword = await this.db_System.tb_password.findFirst({
      where: {
        user_id: user_id,
        is_active: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const isMatch = comparePassword(
      userChangePassDto.old_pass,
      lastPassword.hash,
    );

    if (!isMatch) {
      throw new HttpException("Old password does not match", 401);
    }

    if (!user_id) {
      throw new NotFoundException("User not found");
    }

    const x = await this.db_System.tb_password.updateMany({
      where: {
        user_id: user_id,
      },
      data: {
        is_active: false,
      },
    });

    const passObj = await this.db_System.tb_password.create({
      data: {
        user_id: user_id,
        hash: hashPassword(userChangePassDto.new_pass),
        is_active: true,
      },
    });

    // drop current token by user id
    const deleteSessionObj =
      await this.db_System.tb_user_login_session.deleteMany({
        where: {
          user_id: user_id,
        },
      });

    this.logger.debug(passObj);

    const res: ResponseId<string> = {
      id: user_id,
    };

    return res;
  }

  async checkDatabaseToken(token: string): Promise<boolean> {
    this.logger.debug(`Checking database token`);
    const refreshTokenList =
      await this.db_System.tb_user_login_session.findFirst({
        where: {
          token: token,
        },
      });

    if (!refreshTokenList) {
      throw new InvalidTokenException("Invalid token");
    }

    return refreshTokenList ? true : false;
  }

  async checkToken(token: string, req: any): Promise<ResponseSingle<object>> {
    const isWelformJWT_ = isWelformJWT(token);

    if (!isWelformJWT_) {
      throw new InvalidTokenException("Invalid token");
    }

    const payload = this.jwtService.decode(token);

    if (!payload) {
      throw new InvalidTokenException("Invalid token");
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
    this.db_System = this.prismaClientManager.getSystemDB();

    this.logger.debug(userForgotPassDto);
    const u = await this.systemUsersService.findByUsername(
      this.db_System,
      userForgotPassDto.email,
    );

    if (!u) {
      throw new NotFoundException("User not found");
    }

    const { ...payload } = {
      type: "forgotpassword",
      username: u.username,
      email: u.email,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.EMAIL_FORGOT_PASSWORD_EXPIRES_IN || "1h",
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
      throw new InvalidTokenException("Invalid token");
    }

    const payload = this.jwtService.verify(userForgotPassDto.emailToken);

    if (!payload) {
      throw new InvalidTokenException("Invalid token");
    }

    if (payload.username !== userForgotPassDto.username) {
      throw new InvalidTokenException("Invalid token");
    }

    this.db_System = this.prismaClientManager.getSystemDB();
    const user = await this.systemUsersService.findByUsername(
      this.db_System,
      userForgotPassDto.username,
    );

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.db_System.tb_password.updateMany({
      where: {
        user_id: user.id,
      },
      data: {
        is_active: false,
      },
    });

    const passObj = await this.db_System.tb_password.create({
      data: {
        user_id: user.id,
        hash: hashPassword(userForgotPassDto.password),
        is_active: true,
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
      userRegisterEmailDto.email === ""
    ) {
      throw new NullException();
    }

    this.logger.debug(userRegisterEmailDto);

    this.db_System = this.prismaClientManager.getSystemDB();
    const found = await this.systemUsersService.findByUsername(
      this.db_System,
      userRegisterEmailDto.email,
    );

    this.logger.debug(found);

    if (found) {
      throw new DuplicateException("User already exists");
    }

    const { ...payload }: object = {
      type: "register",
      username: userRegisterEmailDto.email,
      email: userRegisterEmailDto.email,
    };

    console.log(payload);

    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.EMAIL_REGISTER_CONFIRM_EXPIRES_IN || "1h",
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
      throw new InvalidTokenException("Invalid token");
    }

    const payload = this.jwtService.verify(userRegisterDto.emailToken);

    if (!payload) {
      throw new InvalidTokenException("Invalid token");
    }

    if (
      payload.username !== userRegisterDto.username ||
      payload.email !== userRegisterDto.email
    ) {
      throw new InvalidTokenException("Invalid token");
    }

    this.db_System = this.prismaClientManager.getSystemDB();
    const found = await this.systemUsersService.findByUsername(
      this.db_System,
      userRegisterDto.username,
    );

    if (found) {
      throw new DuplicateException("User already exists");
    }

    const createUserObj = await this.db_System.tb_user.create({
      data: {
        username: userRegisterDto.username,
        email: userRegisterDto.email,
      },
    });

    const passObj = await this.db_System.tb_password.create({
      data: {
        user_id: createUserObj.id,
        hash: hashPassword(userRegisterDto.password),
        is_active: true,
      },
    });

    const userInfoObj = await this.db_System.tb_user_profile.create({
      data: {
        user_id: createUserObj.id,
        firstname: userRegisterDto.userInfo.firstName || "",
        middlename: userRegisterDto.userInfo.middleName || "",
        lastname: userRegisterDto.userInfo.lastName || "",
        // bio: userRegisterDto.userInfo.bio,
      },
    });

    const res: ResponseId<string> = {
      id: createUserObj.id,
    };

    return res;
  }

  async validateUser({ username, password }: AuthPayloadDto) {
    this.db_System = this.prismaClientManager.getSystemDB();
    const findUser = await this.systemUsersService.findByUsername(
      this.db_System,
      username,
    );

    if (!findUser) return null;

    const lastPassword = await this.db_System.tb_password.findFirst({
      where: {
        user_id: findUser.id,
        is_active: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const isMatch = comparePassword(password, lastPassword.hash);

    if (isMatch) {
      const {
        consent,
        created_at,
        created_by_id,
        updated_at,
        updated_by_id,
        ...user
      } = findUser;

      const userBusinessUnit = await this.db_System.tb_user_tb_business_unit
        .findMany({
          where: {
            user_id: findUser.id,
            is_active: true,
          },
          select: {
            tb_business_unit: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })
        .then((res) => {
          return res.map((item) => {
            return {
              id: item.tb_business_unit.id,
              name: item.tb_business_unit.name,
            };
          });
        });

      const payload_refresh = {
        ...user,
        is_refresh: true,
      };

      const res = {
        id: findUser.id,
        username: user.username,
        access_token: this.jwtService.sign(user),
        refresh_token: this.jwtService.sign(payload_refresh, {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        }),
        tenant: userBusinessUnit,
      };

      // delete session is expired
      const deleteSessionObj =
        await this.db_System.tb_user_login_session.deleteMany({
          where: {
            expired_on: {
              lt: new Date(),
            },
          },
        });

      // create a new session in db
      const accessTokenObj = await this.db_System.tb_user_login_session.create({
        data: {
          token: res.access_token,
          user_id: findUser.id,
          expired_on: new Date(
            new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          token_type: "access_token",
        },
      });

      const refreshTokenObj = await this.db_System.tb_user_login_session.create(
        {
          data: {
            token: res.refresh_token,
            user_id: findUser.id,
            expired_on: new Date(
              new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            token_type: "refresh_token",
          },
        },
      );

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

    //create token in token table
    const tokenObj = await this.db_System.tb_user_login_session.create({
      data: {
        token: res.access_token,
        user_id: id,
        expired_on: new Date(
          new Date().getTime() + 1 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        token_type: "access_token",
      },
    });

    return res;
  }
}
