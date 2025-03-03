import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import {
  PrismaClient as dbTenant,
  tb_config_running_code,
} from "@prisma-carmen-client-tenant";
import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import {
  ConfigRunningCodeCreateDto,
  ConfigRunningCodeUpdateDto,
} from "shared-dtos/config/config-running-code";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";

@Injectable()
export class RunningCodeService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(RunningCodeService.name);

  async _getById(
    db_tenant: dbTenant,
    id: string,
  ): Promise<tb_config_running_code> {
    this.logger.debug({
      file: RunningCodeService.name,
      function: this._getById.name,
    });
    const res = await db_tenant.tb_config_running_code.findUnique({
      where: { id },
    });
    return res;
  }

  async findOne(
    req: Request,
    id: string,
  ): Promise<ResponseSingle<tb_config_running_code>> {
    this.logger.debug({
      file: RunningCodeService.name,
      function: this.findOne.name,
    });
    const { business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Running code not found");
    }

    const res: ResponseSingle<tb_config_running_code> = {
      data: oneObj,
    };

    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_config_running_code>> {
    this.logger.debug({
      file: RunningCodeService.name,
      function: this.findAll.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_config_running_code.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_config_running_code.findMany(
      q.findMany(),
    );

    const res: ResponseList<tb_config_running_code> = {
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

  async create(req: Request, createDto: ConfigRunningCodeCreateDto) {
    this.logger.debug({
      file: RunningCodeService.name,
      function: this.create.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    // const found = await this.db_tenant.tb_config_running_code.findUnique({
    //   where: { id: createDto.id },
    // });

    const createdObj = await this.db_tenant.tb_config_running_code.create({
      data: {
        ...createDto,
      },
    });

    const res: ResponseId<string> = {
      id: createdObj.id,
    };

    return res;
  }

  async update(
    req: Request,
    id: string,
    updateDto: ConfigRunningCodeUpdateDto,
  ) {
    this.logger.debug({
      file: RunningCodeService.name,
      function: this.update.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Running code not found");
    }

    const updatedObj = await this.db_tenant.tb_config_running_code.update({
      where: { id },
      data: { ...updateDto },
    });

    const res: ResponseId<string> = {
      id: updatedObj.id,
    };

    return res;
  }

  async delete(req: Request, id: string) {
    this.logger.debug({
      file: RunningCodeService.name,
      function: this.delete.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Running code not found");
    }

    await this.db_tenant.tb_config_running_code.delete({
      where: { id },
    });
  }

  // // Helper function to format dates
  // async formatDate(date, pattern) {
  //   const year = date.getFullYear().toString();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const day = date.getDate().toString().padStart(2, "0");

  //   return pattern
  //     .replace("yyyy", year)
  //     .replace("MM", month)
  //     .replace("dd", day);
  // }

  // // Helper function to pad a string with specified character
  // async padLeft(str, length, char) {
  //   return str.length >= length
  //     ? str
  //     : new Array(length - str.length + 1).join(char) + str;
  // }

  // // Helper function to generate random string from character set
  // async generateRandom(length, charSet) {
  //   let result = "";
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * charSet.length);
  //     result += charSet[randomIndex];
  //   }
  //   return result;
  // }

  // async GenerateXXX(formatObj, date = null, last_no = null) {
  //   // Process the format string and replace the placeholders
  //   let result = formatObj.format;

  //   // Process each key in the format object
  //   for (const key in formatObj) {
  //     if (key === "format") continue;

  //     const value = formatObj[key];
  //     let replacement = "";

  //     // Check if value is a string or a function call
  //     if (typeof value === "string") {
  //       if (value.startsWith("now(")) {
  //         // Handle now() function - current date
  //         const formatPattern = value.match(/now\('(.+)'\)/)[1];
  //         replacement = await this.formatDate(new Date(), formatPattern);
  //       } else if (value.startsWith("date(")) {
  //         // Handle date() function - provided date
  //         const formatPattern = value.match(/date\('(.+)'\)/)[1];
  //         const dateObj = date ? new Date(date) : new Date();
  //         replacement = await this.formatDate(dateObj, formatPattern);
  //       } else if (value.startsWith("running(")) {
  //         // Handle running() function - sequential number
  //         const params = value.match(/running\((\d+),\s*'(.)'\)/);
  //         const digits = parseInt(params[1]);
  //         const padChar = params[2];
  //         const nextNumber = last_no !== null ? last_no + 1 : 1;
  //         replacement = await this.padLeft(
  //           nextNumber.toString(),
  //           digits,
  //           padChar,
  //         );
  //       } else if (value.startsWith("random(")) {
  //         // Handle random() function - random characters
  //         const params = value.match(/random\((\d+),\s*(\[.+\])\)/);
  //         const length = parseInt(params[1]);
  //         const charSet = JSON.parse(params[2].replace(/'/g, '"'));
  //         replacement = await this.generateRandom(length, charSet);
  //       } else {
  //         // Handle plain string
  //         replacement = value;
  //       }
  //     } else {
  //       replacement = value;
  //     }

  //     // Replace placeholder in format string
  //     result = result.replace(`{${key}}`, replacement);
  //   }

  //   return result;
  // }

  // Example usage:
  //   const obj1 = {
  //     A: "PR",
  //     B: "now('yyyyMMdd')",
  //     C: "running(5,'0')",
  //     format: "{A}{B}{C}"
  //   };
  //   console.log(GenerateXXX(obj1, null, 3)); // PR2025022600004
  //   console.log(GenerateXXX(obj1, null, 4)); // PR2025022600005

  //   const obj2 = {
  //     A: "CN",
  //     B: "date('yyyyMMdd')",
  //     C: "-",
  //     D: "random(5,['a','A','0','$'])",
  //     format: "{A}{B}{C}{D}"
  //   };
  //   console.log(GenerateXXX(obj2, '2024-01-05', null)); // CN20240105-random5chars
  //   console.log(GenerateXXX(obj2, '2024-01-05', null)); // CN20240105-different5chars

  //   const obj3 = {
  //     A: "IS",
  //     B: "date('yyyyMM')",
  //     C: "##",
  //     D: "running(5,'Z')",
  //     format: "{A}{B}{C}{D}"
  //   };
  //   console.log(GenerateXXX(obj3, '2024-12-05', 31)); // IS202412##ZZZ32
  //   console.log(GenerateXXX(obj3, '2024-12-05', 32)); // IS202412##ZZZ33
}
