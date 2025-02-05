import { ResponseId, ResponseList, ResponseSingle } from "lib/helper/iResponse";
import QueryParams from "lib/types";
import { DuplicateException } from "lib/utils/exceptions";
import {
  enum_product_status_type,
  enum_unit_type,
  ProductCreateDto,
  ProductUpdateDto,
} from "shared-dtos";
import { ExtractReqService } from "src/_lib/auth/extract-req/extract-req.service";
import { PrismaClientManagerService } from "src/_lib/prisma-client-manager/prisma-client-manager.service";
import { ProductUpdateSchema } from "shared-dtos";

import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  PrismaClient as dbTenant,
  tb_product,
  tb_location,
  tb_product_location,
  tb_unit_conversion,
} from "@prisma-carmen-client-tenant";

@Injectable()
export class ProductsService {
  private db_tenant: dbTenant;

  constructor(
    private prismaClientManager: PrismaClientManagerService,
    private extractReqService: ExtractReqService,
  ) {}

  logger = new Logger(ProductsService.name);

  async getByItemsGroup(req: Request, q: QueryParams, id: string) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.getByItemsGroup.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_product.count({
      where: q.where(),
    });

    const listObj = await this.db_tenant.tb_product.findMany({
      where: {
        itemsGroupId: id,
        ...q.where(),
      },
      orderBy: q.orderBy(),
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const res: ResponseList<tb_product> = {
      data: listObj,
      pagination: {
        page: q.page,
        perpage: q.perpage,
        total: max,
      },
    };
    return res;
  }

  // ปัญหาเรื่องการค้นหาไม่ได้
  async getOrderUnitByProductId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.getOrderUnitByProductId.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_unit_conversion.count({
      where: {
        product_id: id,
        unit_type: enum_unit_type.order_unit,
        is_active: true,
        // tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
        //   name: { contains: q.search, mode: "insensitive" },
        // },
        // tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
        //   name: { contains: q.search, mode: "insensitive" },
        // },
      },
    });

    const query = await this.db_tenant.tb_unit_conversion.findMany({
      where: {
        product_id: id,
        unit_type: enum_unit_type.order_unit,
        is_active: true,
        // tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
        //   name: { contains: q.search, mode: "insensitive" },
        // },

        // tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
        //   name: { contains: q.search, mode: "insensitive" },
        // },
      },
      select: {
        id: true,
        product_id: true,
        unit_type: true,
        description: true,
        tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
          select: {
            id: true,
            name: true,
          },
        },
        from_unit_qty: true,
        tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
          select: {
            id: true,
            name: true,
          },
        },
        to_unit_qty: true,
      },
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const orderUnits = query.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      unit_type: item.unit_type,
      from_unit_name:
        item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.name,
      from_unit_qty: Number(item.from_unit_qty),
      to_unit_name: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.name,
      to_unit_qty: Number(item.to_unit_qty),
      description: item.description,
    }));

    this.logger.debug({ orderUnits: orderUnits });

    const res: ResponseList<any> = {
      data: orderUnits,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  // ปัญหาเรื่องการค้นหาไม่ได้
  async getCountUnitByProductId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.getCountUnitByProductId.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_unit_conversion.count({
      where: {
        product_id: id,
        unit_type: enum_unit_type.count_unit,
        is_active: true,
        // OR: [
        //   {
        //     tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        //   {
        //     tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        // ],
      },
    });

    const query = await this.db_tenant.tb_unit_conversion.findMany({
      where: {
        product_id: id,
        unit_type: enum_unit_type.count_unit,
        is_active: true,
        // OR: [
        //   {
        //     tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        //   {
        //     tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        // ],
      },
      select: {
        id: true,
        product_id: true,
        unit_type: true,
        description: true,
        tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
          select: {
            id: true,
            name: true,
          },
        },
        from_unit_qty: true,
        tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
          select: {
            id: true,
            name: true,
          },
        },
        to_unit_qty: true,
      },
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const countUnits = query.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      unit_type: item.unit_type,
      from_unit_name:
        item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.name,
      from_unit_qty: Number(item.from_unit_qty),
      to_unit_name: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.name,
      to_unit_qty: Number(item.to_unit_qty),
      description: item.description,
    }));

    this.logger.debug({ orderUnits: countUnits });

    const res: ResponseList<any> = {
      data: countUnits,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  // ปัญหาเรื่องการค้นหาไม่ได้
  async getRecipeUnitByProductId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.getRecipeUnitByProductId.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_unit_conversion.count({
      where: {
        product_id: id,
        unit_type: enum_unit_type.recipe_unit,
        is_active: true,
        // OR: [
        //   {
        //     tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        //   {
        //     tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        // ],
      },
    });

    const query = await this.db_tenant.tb_unit_conversion.findMany({
      where: {
        product_id: id,
        unit_type: enum_unit_type.recipe_unit,
        is_active: true,
        // OR: [
        //   {
        //     tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        //   {
        //     tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
        //       name: q.search
        //         ? { contains: q.search, mode: "insensitive" }
        //         : undefined,
        //     },
        //   },
        // ],
      },
      select: {
        id: true,
        product_id: true,
        unit_type: true,
        description: true,
        tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
          select: {
            id: true,
            name: true,
          },
        },
        from_unit_qty: true,
        tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
          select: {
            id: true,
            name: true,
          },
        },
        to_unit_qty: true,
      },
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const recipeUnits = query.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      unit_type: item.unit_type,
      from_unit_name:
        item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.name,
      from_unit_qty: Number(item.from_unit_qty),
      to_unit_name: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.name,
      to_unit_qty: Number(item.to_unit_qty),
      description: item.description,
    }));

    this.logger.debug({ recipeUnits: recipeUnits });

    const res: ResponseList<any> = {
      data: recipeUnits,
      pagination: {
        total: max,
        page: q.page,
        perpage: q.perpage,
        pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
      },
    };
    return res;
  }

  async _getById(db_tenant: dbTenant, id: string): Promise<any> {
    this.logger.debug({
      file: ProductsService.name,
      function: this._getById.name,
    });

    const res = await db_tenant.tb_product.findUnique({
      where: {
        id: id,
      },
      include: {
        tb_product_info: true,
      },
    });
    return res;
  }

  async findOne(req: Request, id: string): Promise<ResponseSingle<tb_product>> {
    this.logger.debug({
      file: ProductsService.name,
      function: this.findOne.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Product not found");
    }

    const res: ResponseSingle<tb_product> = {
      data: oneObj,
    };
    return res;
  }

  async findAll(
    req: Request,
    q: QueryParams,
  ): Promise<ResponseList<tb_product>> {
    this.logger.debug({
      file: ProductsService.name,
      function: this.findAll.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);
    const max = await this.db_tenant.tb_product.count({
      where: q.where(),
    });

    const include = {
      ...q.findMany(),
      include: {
        tb_product_info: true,
      },
    };

    const listObj = await this.db_tenant.tb_product.findMany(include);

    const res: ResponseList<tb_product> = {
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

  async create(req: Request, createDto: ProductCreateDto) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.create.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_product.findFirst({
      where: {
        OR: [{ name: createDto.name }, { code: createDto.code }],
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: "Product already exists",
        id: found.id,
      });
    }

    if (createDto.locations.add) {
      const findLocation = await this.db_tenant.tb_location.findMany({
        where: {
          id: {
            in: createDto.locations.add.map((location) => location.location_id),
          },
        },
      });

      const foundLocationIds = findLocation.map((location) => location.id);
      const notFoundLocationIds = createDto.locations.add
        .map((location) => location.location_id)
        .filter((id) => !foundLocationIds.includes(id));

      if (notFoundLocationIds.length > 0) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: "Location not found",
          id: notFoundLocationIds,
        });
      }
    }

    const unitTypes = [
      { type: enum_unit_type.order_unit, units: createDto.orderUnits?.add },
      { type: enum_unit_type.recipe_unit, units: createDto.recipeUnits?.add },
      { type: enum_unit_type.count_unit, units: createDto.countUnits?.add },
    ];

    for (const { type, units } of unitTypes) {
      if (units) {
        const findUnits = await this.db_tenant.tb_unit.findMany({
          where: {
            id: { in: units.map((unit) => unit.unit_id) },
          },
        });

        const foundUnitIds = findUnits.map((unit) => unit.id);
        const notFoundUnitIds = units
          .map((unit) => unit.unit_id)
          .filter((id) => !foundUnitIds.includes(id));

        if (notFoundUnitIds.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: `${type} unit not found`,
            id: notFoundUnitIds,
          });
        }
      }
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const product_obj: any = {
        code: createDto.code,
        name: createDto.name,
        local_name: createDto.local_name,
        description: createDto.description,
        primary_unit_id: createDto.primary_unit_id,
        product_status_type: createDto.product_status_type,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.debug(product_obj);

      const createObj = await transactionClient.tb_product.create({
        data: {
          ...product_obj,
          created_by_id: user_id,
          created_at: new Date(),
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      const product_Info_obj: any = {
        product_id: createObj.id,
        product_item_group_id: createDto.product_item_group_id,
        price: createDto.price,
        tax_type: createDto.tax_type,
        tax_rate: createDto.tax_rate,
        is_ingredients: createDto.is_ingredients,
        price_deviation_limit: createDto.price_deviation_limit,
        info: createDto.info,
      };

      this.logger.debug(product_Info_obj);

      await transactionClient.tb_product_info.create({
        data: {
          ...product_Info_obj,
          created_by_id: user_id,
          created_at: new Date(),
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      if (createDto.locations.add) {
        const product_location_obj = createDto.locations?.add?.map(
          (location) => ({
            location_id: location.location_id,
            product_id: createObj.id,
          }),
        );

        this.logger.debug(product_location_obj);

        await transactionClient.tb_product_location.createMany({
          data: product_location_obj,
        });
      }

      if (createDto.orderUnits?.add) {
        const product_order_unit_obj: any = createDto.orderUnits.add.map(
          (unit) => ({
            product_id: createObj.id,
            unit_type: enum_unit_type.order_unit,
            from_unit_id: unit.unit_id,
            from_unit_qty: unit.quantity,
            to_unit_id: unit.to_unit_id,
            to_unit_qty: unit.to_quantity,
            description: unit.description ?? null,
            created_by_id: user_id,
            created_at: new Date(),
            updated_by_id: user_id,
            updated_at: new Date(),
          }),
        );

        this.logger.debug(product_order_unit_obj);

        await transactionClient.tb_unit_conversion.createMany({
          data: product_order_unit_obj,
        });
      }

      if (createDto.recipeUnits?.add) {
        const product_recipe_unit_obj: any = createDto.recipeUnits.add.map(
          (unit) => ({
            product_id: createObj.id,
            unit_type: enum_unit_type.recipe_unit,
            from_unit_id: unit.unit_id,
            from_unit_qty: unit.quantity,
            to_unit_id: unit.to_unit_id,
            to_unit_qty: unit.to_quantity,
            description: unit.description ?? null,
            created_by_id: user_id,
            created_at: new Date(),
            updated_by_id: user_id,
            updated_at: new Date(),
          }),
        );

        this.logger.debug(product_recipe_unit_obj);

        await transactionClient.tb_unit_conversion.createMany({
          data: product_recipe_unit_obj,
        });
      }

      if (createDto.countUnits?.add) {
        const product_count_unit_obj: any = createDto.countUnits.add.map(
          (unit) => ({
            product_id: createObj.id,
            unit_type: enum_unit_type.count_unit,
            from_unit_id: unit.unit_id,
            from_unit_qty: unit.quantity,
            to_unit_id: unit.to_unit_id,
            to_unit_qty: unit.to_quantity,
            description: unit.description ?? null,
            created_by_id: user_id,
            created_at: new Date(),
            updated_by_id: user_id,
            updated_at: new Date(),
          }),
        );

        this.logger.debug(product_count_unit_obj);

        await transactionClient.tb_unit_conversion.createMany({
          data: product_count_unit_obj,
        });
      }

      const res: ResponseId<string> = { id: createObj.id };

      return res;
    });

    return tx;
  }

  async update(req: Request, id: string, updateDto: ProductUpdateDto) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.update.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Product not found");
    }

    if (updateDto.locations) {
      if (updateDto.locations.add) {
        const findLocationAdd = await this.db_tenant.tb_location.findMany({
          where: {
            id: {
              in: updateDto.locations.add.map(
                (location) => location.location_id,
              ),
            },
          },
        });

        const foundLocationIds = findLocationAdd.map((location) => location.id);
        const notFoundLocationIds = updateDto.locations.add
          .map((location) => location.location_id)
          .filter((id) => !foundLocationIds.includes(id));

        if (notFoundLocationIds.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Location not found",
            id: notFoundLocationIds,
          });
        }
      }

      if (updateDto.locations.remove) {
        const findLocationRemove = await this.db_tenant.tb_location.findMany({
          where: {
            id: {
              in: updateDto.locations.remove.map(
                (location) => location.location_id,
              ),
            },
          },
        });

        const foundLocationIds = findLocationRemove.map(
          (location) => location.id,
        );
        const notFoundLocationIds = updateDto.locations.remove
          .map((location) => location.location_id)
          .filter((id) => !foundLocationIds.includes(id));

        if (notFoundLocationIds.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Location not found",
            id: notFoundLocationIds,
          });
        }
      }
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const old = await this._getById(this.db_tenant, id);
      this.logger.debug(old);

      const updateProductDataObj = ProductUpdateSchema.safeParse({
        ...old,
        ...updateDto,
        product_item_group_id:
          updateDto.product_item_group_id ??
          old.tb_product_info.product_item_group_id,
      }).data;

      this.logger.warn(updateProductDataObj);

      const updateObj = await this.db_tenant.tb_product.update({
        where: {
          id,
        },
        data: {
          // ...updateProductDataObj,
          //   code: updateProductDataObj.code,
          //   name: updateProductDataObj.name,
          //   local_name: updateProductDataObj.local_name,
          //   description: updateProductDataObj.description,
          //   primary_unit_id: updateProductDataObj.primary_unit_id,
          product_status_type:
            updateProductDataObj.product_status_type as enum_product_status_type,
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      if (updateDto.locations) {
        if (updateDto.locations.add) {
          const product_location_add_obj = updateDto.locations?.add?.map(
            (location) => ({
              location_id: location.location_id,
              product_id: id,
            }),
          );

          await transactionClient.tb_product_location.createMany({
            data: product_location_add_obj,
          });
        }

        if (updateDto.locations.remove) {
          const product_location_remove_obj = updateDto.locations?.remove?.map(
            (location) => ({
              location_id: location.location_id,
              product_id: id,
            }),
          );

          await transactionClient.tb_product_location.deleteMany({
            where: {
              product_id: id,
              location_id: {
                in: product_location_remove_obj.map(
                  (location) => location.location_id,
                ),
              },
            },
          });
        }
      }

      const res: ResponseId<string> = {
        id: updateObj.id,
      };

      return res;
    });
    return tx;
  }

  async delete(req: Request, id: string) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.delete.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant = this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException("Product not found");
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      await transactionClient.tb_product_info.delete({
        where: {
          product_id: id,
        },
      });

      await transactionClient.tb_product_location.deleteMany({
        where: {
          product_id: id,
        },
      });

      await transactionClient.tb_unit_conversion.deleteMany({
        where: {
          product_id: id,
        },
      });

      await transactionClient.tb_product.delete({
        where: {
          id,
        },
      });
    });
  }
}
