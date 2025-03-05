import { ResponseId, ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import QueryParams from 'lib/types';
import { DuplicateException } from 'lib/utils/exceptions';
import {
  enum_product_status_type,
  enum_unit_type,
  ProductCreateDto,
  ProductUpdateDto,
} from 'shared-dtos';
import { ExtractReqService } from 'src/_lib/auth/extract-req/extract-req.service';
import { PrismaClientManagerService } from 'src/_lib/prisma-client-manager/prisma-client-manager.service';
import { ProductUpdateSchema } from 'shared-dtos';
import { NotFoundException } from 'lib/utils/exceptions';

import {
  HttpStatus,
  Injectable,
  Logger,
  // NotFoundException,
} from '@nestjs/common';
import {
  PrismaClient as dbTenant,
  tb_product,
  tb_location,
  tb_product_location,
  tb_unit_conversion,
} from '@prisma/client';

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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

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

  async getOrderUnitByProductId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.getOrderUnitByProductId.name,
    });
    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_unit_conversion.count({
      where: {
        product_id: id,
        unit_type: enum_unit_type.order_unit,
        is_active: true,
        OR: [
          {
            tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
          {
            tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
        ],
      },
    });

    const query = await this.db_tenant.tb_unit_conversion.findMany({
      where: {
        product_id: id,
        unit_type: enum_unit_type.order_unit,
        is_active: true,
        OR: [
          {
            tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
          {
            tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
        ],
      },
      select: {
        id: true,
        product_id: true,
        unit_type: true,
        description: true,
        is_default: true,
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
        is_active: true,
      },
      skip: (q.page - 1) * q.perpage,
      take: q.perpage,
    });

    const orderUnits = query.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      unit_type: item.unit_type,
      from_unit_id: item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.id,
      from_unit_name:
        item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.name,
      from_unit_qty: Number(item.from_unit_qty),
      to_unit_id: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.id,
      to_unit_name: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.name,
      to_unit_qty: Number(item.to_unit_qty),
      is_default: item.is_default,
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

  // async getCountUnitByProductId(req: Request, id: string, q: QueryParams) {
  //   this.logger.debug({
  //     file: ProductsService.name,
  //     function: this.getCountUnitByProductId.name,
  //   });
  //   const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
  //   this.db_tenant =
  //     await this.prismaClientManager.getTenantDB(business_unit_id);

  //   const max = await this.db_tenant.tb_unit_conversion.count({
  //     where: {
  //       product_id: id,
  //       unit_type: enum_unit_type.count_unit,
  //       is_active: true,
  //       OR: [
  //         {
  //           tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
  //             name: { contains: q.search, mode: 'insensitive' },
  //           },
  //         },
  //         {
  //           tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
  //             name: { contains: q.search, mode: 'insensitive' },
  //           },
  //         },
  //       ],
  //     },
  //   });

  //   const query = await this.db_tenant.tb_unit_conversion.findMany({
  //     where: {
  //       product_id: id,
  //       unit_type: enum_unit_type.count_unit,
  //       is_active: true,
  //       OR: [
  //         {
  //           tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
  //             name: { contains: q.search, mode: 'insensitive' },
  //           },
  //         },
  //         {
  //           tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
  //             name: { contains: q.search, mode: 'insensitive' },
  //           },
  //         },
  //       ],
  //     },
  //     select: {
  //       id: true,
  //       product_id: true,
  //       unit_type: true,
  //       description: true,
  //       is_default: true,
  //       tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //       from_unit_qty: true,
  //       tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //       to_unit_qty: true,
  //     },
  //     skip: (q.page - 1) * q.perpage,
  //     take: q.perpage,
  //   });

  //   const countUnits = query.map((item) => ({
  //     id: item.id,
  //     product_id: item.product_id,
  //     unit_type: item.unit_type,
  //     from_unit_id: item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.id,
  //     from_unit_name:
  //       item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.name,
  //     from_unit_qty: Number(item.from_unit_qty),
  //     to_unit_id: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.id,
  //     to_unit_name: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.name,
  //     to_unit_qty: Number(item.to_unit_qty),
  //     is_default: item.is_default,
  //   }));

  //   this.logger.debug({ orderUnits: countUnits });

  //   const res: ResponseList<any> = {
  //     data: countUnits,
  //     pagination: {
  //       total: max,
  //       page: q.page,
  //       perpage: q.perpage,
  //       pages: max == 0 ? 1 : Math.ceil(max / q.perpage),
  //     },
  //   };
  //   return res;
  // }

  async getIngredientUnitByProductId(req: Request, id: string, q: QueryParams) {
    this.logger.debug({
      file: ProductsService.name,
      function: this.getIngredientUnitByProductId.name,
    });

    const { user_id, business_unit_id } = this.extractReqService.getByReq(req);
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const max = await this.db_tenant.tb_unit_conversion.count({
      where: {
        product_id: id,
        unit_type: enum_unit_type.ingredient_unit,
        is_active: true,
        OR: [
          {
            tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
          {
            tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
        ],
      },
    });

    const query = await this.db_tenant.tb_unit_conversion.findMany({
      where: {
        product_id: id,
        unit_type: enum_unit_type.ingredient_unit,
        is_active: true,
        OR: [
          {
            tb_unit_tb_unit_conversion_from_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
          {
            tb_unit_tb_unit_conversion_to_unit_idTotb_unit: {
              name: { contains: q.search, mode: 'insensitive' },
            },
          },
        ],
      },
      select: {
        id: true,
        product_id: true,
        unit_type: true,
        description: true,
        is_default: true,
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

    const ingredientUnits = query.map((item) => ({
      id: item.id,
      product_id: item.product_id,
      unit_type: item.unit_type,
      from_unit_id: item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.id,
      from_unit_name:
        item.tb_unit_tb_unit_conversion_from_unit_idTotb_unit.name,
      from_unit_qty: Number(item.from_unit_qty),
      to_unit_id: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.id,
      to_unit_name: item.tb_unit_tb_unit_conversion_to_unit_idTotb_unit.name,
      to_unit_qty: Number(item.to_unit_qty),
      is_default: item.is_default,
    }));

    this.logger.debug({ ingredientUnits: ingredientUnits });

    const res: ResponseList<any> = {
      data: ingredientUnits,
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    let product_primary_unit;
    if (oneObj.inventory_unit_id) {
      product_primary_unit = await this.db_tenant.tb_unit.findUnique({
        where: {
          id: oneObj.inventory_unit_id,
        },
      });
    }

    let product_item_group;
    if (oneObj.tb_product_info?.product_item_group_id) {
      product_item_group =
        await this.db_tenant.tb_product_item_group.findUnique({
          where: {
            id: oneObj.tb_product_info?.product_item_group_id ?? undefined,
          },
        });
    }

    let product_subcategory;
    if (product_item_group?.product_subcategory_id) {
      product_subcategory =
        await this.db_tenant.tb_product_sub_category.findUnique({
          where: {
            id: product_item_group.product_subcategory_id ?? undefined,
          },
        });
    }

    let product_category;
    if (product_subcategory?.product_category_id) {
      product_category = await this.db_tenant.tb_product_category.findUnique({
        where: {
          id: product_subcategory.product_category_id ?? undefined,
        },
      });
    }

    const newFormatObj = {
      id: oneObj.id,
      code: oneObj.code,
      name: oneObj.name,
      local_name: oneObj.local_name,
      description: oneObj.description,
      product_status_type: oneObj.product_status_type,
      product_info: oneObj.tb_product_info
        ? {
            id: oneObj.tb_product_info.id,
            price: oneObj.tb_product_info.price,
            tax_type: oneObj.tb_product_info.tax_type,
            tax_rate: oneObj.tb_product_info.tax_rate,
            is_ingredients: oneObj.tb_product_info.is_ingredients,
            price_deviation_limit: oneObj.tb_product_info.price_deviation_limit,
            info: oneObj.tb_product_info.info,
          }
        : {},
      product_primary_unit: product_primary_unit
        ? {
            id: product_primary_unit.id,
            name: product_primary_unit.name,
          }
        : {},
      product_item_group: product_item_group
        ? {
            id: product_item_group.id,
            name: product_item_group.name,
          }
        : {},
      product_subcategory: product_subcategory
        ? {
            id: product_subcategory.id,
            name: product_subcategory.name,
          }
        : {},
      product_category: product_category
        ? {
            id: product_category.id,
            name: product_category.name,
          }
        : {},
    };

    const res: ResponseSingle<any> = {
      data: newFormatObj,
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);

    const found = await this.db_tenant.tb_product.findFirst({
      where: {
        OR: [{ name: createDto.name }, { code: createDto.code }],
      },
    });

    if (found) {
      throw new DuplicateException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Product already exists',
        data: found.id,
      });
    }

    if (createDto.inventory_unit_id) {
      const findUnit = await this.db_tenant.tb_unit.findFirst({
        where: { id: createDto.inventory_unit_id },
      });

      if (!findUnit) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Primary Unit not found',
          data: createDto.inventory_unit_id,
        });
      }
    }

    if (createDto.product_item_group_id) {
      const findProductItemGroup =
        await this.db_tenant.tb_product_item_group.findFirst({
          where: {
            id: createDto.product_item_group_id,
          },
        });

      if (!findProductItemGroup) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product Item Group not found',
          data: createDto.product_item_group_id,
        });
      }
    }

    if (createDto.locations?.add) {
      let locationNotFound = [];
      await Promise.all(
        createDto.locations.add.map(async (location) => {
          const findLocation = await this.db_tenant.tb_location.findFirst({
            where: {
              id: location.location_id,
            },
          });

          if (!findLocation) {
            locationNotFound.push(location.location_id);
          }
        }),
      );

      if (locationNotFound.length > 0) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Add Location not found',
          data: locationNotFound,
        });
      }
    }

    const unitTypes = [
      { type: enum_unit_type.order_unit, units: createDto.orderUnits?.add },
      {
        type: enum_unit_type.ingredient_unit,
        units: createDto.ingredientUnits?.add,
      },
    ];

    for (const { type, units } of unitTypes) {
      if (units) {
        const findUnits = await this.db_tenant.tb_unit.findMany({
          where: {
            id: {
              in: [
                ...units.map((unit) => unit.unit_id),
                ...units.map((unit) => unit.to_unit_id),
              ],
            },
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
            data: notFoundUnitIds,
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
        inventory_unit_id: createDto.inventory_unit_id,
        product_status_type: createDto.product_status_type,
        created_by_id: user_id,
        created_at: new Date(),
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.debug(product_obj);

      const createObj = await transactionClient.tb_product.create({
        data: product_obj,
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

      if (createDto.locations?.add) {
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
            from_unit_qty: unit.unit_quantity,
            to_unit_id: unit.to_unit_id,
            to_unit_qty: unit.to_unit_quantity,
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

      if (createDto.ingredientUnits?.add) {
        const product_ingredient_unit_obj: any =
          createDto.ingredientUnits.add.map((unit) => ({
            product_id: createObj.id,
            unit_type: enum_unit_type.ingredient_unit,
            from_unit_id: unit.unit_id,
            from_unit_qty: unit.unit_quantity,
            to_unit_id: unit.to_unit_id,
            to_unit_qty: unit.to_unit_quantity,
            description: unit.description ?? null,
            created_by_id: user_id,
            created_at: new Date(),
            updated_by_id: user_id,
            updated_at: new Date(),
          }));

        this.logger.debug(product_ingredient_unit_obj);

        await transactionClient.tb_unit_conversion.createMany({
          data: product_ingredient_unit_obj,
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
    }

    if (updateDto.name || updateDto.code) {
      const found = await this.db_tenant.tb_product.findFirst({
        where: {
          OR: [{ name: updateDto.name }, { code: updateDto.code }],
        },
      });

      if (found) {
        throw new DuplicateException({
          statusCode: HttpStatus.CONFLICT,
          message: 'Product already exists',
          data: found.id,
        });
      }
    }

    if (updateDto.inventory_unit_id) {
      const findUnit = await this.db_tenant.tb_unit.findFirst({
        where: { id: updateDto.inventory_unit_id },
      });

      if (!findUnit) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Primary Unit not found',
          data: updateDto.inventory_unit_id,
        });
      }
    }

    if (updateDto.product_item_group_id) {
      const findProductItemGroup =
        await this.db_tenant.tb_product_item_group.findFirst({
          where: { id: updateDto.product_item_group_id },
        });

      if (!findProductItemGroup) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Product Item Group not found',
          data: updateDto.product_item_group_id,
        });
      }
    }

    if (updateDto.locations) {
      if (updateDto.locations.add) {
        let locationNotFound = [];
        await Promise.all(
          updateDto.locations.add.map(async (location) => {
            const findLocation = await this.db_tenant.tb_location.findFirst({
              where: {
                id: location.location_id,
              },
            });

            if (!findLocation) {
              locationNotFound.push(location.location_id);
            }
          }),
        );

        if (locationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Add Location not found',
            data: locationNotFound,
          });
        }
      }

      if (updateDto.locations.update) {
        let productLocationNotFound = [];
        let locationNotFound = [];
        await Promise.all(
          updateDto.locations.update.map(async (location) => {
            const findProductLocation =
              await this.db_tenant.tb_product_location.findFirst({
                where: { id: location.product_location_id },
              });

            if (!findProductLocation) {
              productLocationNotFound.push(location.product_location_id);
            }

            const findLocation = await this.db_tenant.tb_location.findFirst({
              where: { id: location.location_id },
            });

            if (!findLocation) {
              locationNotFound.push(location.location_id);
            }
          }),
        );

        if (productLocationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Product Location not found',
            data: productLocationNotFound,
          });
        }

        if (locationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Location not found',
            data: locationNotFound,
          });
        }
      }

      if (updateDto.locations.remove) {
        let productLocationNotFound = [];
        await Promise.all(
          updateDto.locations.remove.map(async (location) => {
            const findLocation =
              await this.db_tenant.tb_product_location.findFirst({
                where: { id: location.product_location_id },
              });

            if (!findLocation) {
              productLocationNotFound.push(location.product_location_id);
            }
          }),
        );

        if (productLocationNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Remove Location not found',
            data: productLocationNotFound,
          });
        }
      }
    }

    if (updateDto.orderUnits) {
      if (updateDto.orderUnits.add) {
        let orderUnitNotFound = [];
        let orderToUnitNotFound = [];

        await Promise.all(
          updateDto.orderUnits.add.map(async (unit) => {
            const findUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.unit_id },
            });

            if (!findUnit) {
              orderUnitNotFound.push(unit.unit_id);
            }

            const findToUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.to_unit_id },
            });

            if (!findToUnit) {
              orderToUnitNotFound.push(unit.to_unit_id);
            }
          }),
        );

        if (orderUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Add Order Unit not found',
            data: orderUnitNotFound,
          });
        }

        if (orderToUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Add Order To Unit not found',
            data: orderToUnitNotFound,
          });
        }
      }

      if (updateDto.orderUnits.update) {
        let productOrderUnitNotFound = [];
        let orderUnitNotFound = [];
        let orderToUnitNotFound = [];

        await Promise.all(
          updateDto.orderUnits.update.map(async (unit) => {
            const findProductOrderUnit =
              await this.db_tenant.tb_unit_conversion.findFirst({
                where: { id: unit.product_order_unit_id },
              });

            if (!findProductOrderUnit) {
              productOrderUnitNotFound.push(unit.product_order_unit_id);
            }

            const findOrderUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.unit_id },
            });

            if (!findOrderUnit) {
              orderUnitNotFound.push(unit.unit_id);
            }

            const findToUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.to_unit_id },
            });

            if (!findToUnit) {
              orderToUnitNotFound.push(unit.to_unit_id);
            }
          }),
        );

        if (productOrderUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Product Order Unit not found',
            data: productOrderUnitNotFound,
          });
        }

        if (orderUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Order Unit not found',
            data: orderUnitNotFound,
          });
        }

        if (orderToUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Order To Unit not found',
            data: orderToUnitNotFound,
          });
        }
      }

      if (updateDto.orderUnits.remove) {
        let productOrderUnitNotFound = [];
        await Promise.all(
          updateDto.orderUnits.remove.map(async (unit) => {
            const findProductOrderUnit =
              await this.db_tenant.tb_unit_conversion.findFirst({
                where: { id: unit.product_order_unit_id },
              });

            if (!findProductOrderUnit) {
              productOrderUnitNotFound.push(unit.product_order_unit_id);
            }
          }),
        );

        if (productOrderUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Remove Product Order Unit not found',
            data: productOrderUnitNotFound,
          });
        }
      }
    }

    if (updateDto.ingredientUnits) {
      if (updateDto.ingredientUnits.add) {
        let ingredientUnitNotFound = [];
        let ingredientToUnitNotFound = [];

        await Promise.all(
          updateDto.ingredientUnits.add.map(async (unit) => {
            const findUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.unit_id },
            });

            if (!findUnit) {
              ingredientUnitNotFound.push(unit.unit_id);
            }

            const findToUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.to_unit_id },
            });

            if (!findToUnit) {
              ingredientToUnitNotFound.push(unit.to_unit_id);
            }
          }),
        );

        if (ingredientUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Add Ingredient Unit not found',
            data: ingredientUnitNotFound,
          });
        }

        if (ingredientToUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Add Ingredient To Unit not found',
            data: ingredientToUnitNotFound,
          });
        }
      }

      if (updateDto.ingredientUnits.update) {
        let productIngredientUnitNotFound = [];
        let ingredientUnitNotFound = [];
        let ingredientToUnitNotFound = [];

        await Promise.all(
          updateDto.ingredientUnits.update.map(async (unit) => {
            const findProductIngredientUnit =
              await this.db_tenant.tb_unit_conversion.findFirst({
                where: { id: unit.product_order_unit_id },
              });

            if (!findProductIngredientUnit) {
              productIngredientUnitNotFound.push(unit.product_order_unit_id);
            }

            const findIngredientUnit = await this.db_tenant.tb_unit.findFirst({
              where: { id: unit.unit_id },
            });

            if (!findIngredientUnit) {
              ingredientUnitNotFound.push(unit.unit_id);
            }

            const findIngredientToUnit = await this.db_tenant.tb_unit.findFirst(
              {
                where: { id: unit.to_unit_id },
              },
            );

            if (!findIngredientToUnit) {
              ingredientToUnitNotFound.push(unit.to_unit_id);
            }
          }),
        );

        if (productIngredientUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Product Ingredient Unit not found',
            data: productIngredientUnitNotFound,
          });
        }

        if (ingredientUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Ingredient Unit not found',
            data: ingredientUnitNotFound,
          });
        }

        if (ingredientToUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Update Ingredient To Unit not found',
            data: ingredientToUnitNotFound,
          });
        }
      }

      if (updateDto.ingredientUnits.remove) {
        let productIngredientUnitNotFound = [];
        await Promise.all(
          updateDto.ingredientUnits.remove.map(async (unit) => {
            const findProductIngredientUnit =
              await this.db_tenant.tb_unit_conversion.findFirst({
                where: { id: unit.product_order_unit_id },
              });

            if (!findProductIngredientUnit) {
              productIngredientUnitNotFound.push(unit.product_order_unit_id);
            }
          }),
        );

        if (productIngredientUnitNotFound.length > 0) {
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Remove Product Ingredient Unit not found',
            data: productIngredientUnitNotFound,
          });
        }
      }
    }

    const tx = this.db_tenant.$transaction(async (transactionClient) => {
      const product_old = await this._getById(this.db_tenant, id);

      this.logger.debug(product_old);

      const productUpdateObj = {
        code: updateDto.code ?? product_old.code,
        name: updateDto.name ?? product_old.name,
        local_name: updateDto.local_name ?? product_old.local_name,
        description: updateDto.description ?? product_old.description,
        inventory_unit_id:
          updateDto.inventory_unit_id ?? product_old.inventory_unit_id,
        product_status_type:
          updateDto.product_status_type ?? product_old.product_status_type,
        updated_by_id: user_id,
        updated_at: new Date(),
      };

      this.logger.warn(productUpdateObj);

      await this.db_tenant.tb_product.update({
        where: {
          id: id,
        },
        data: {
          ...productUpdateObj,
          updated_by_id: user_id,
          updated_at: new Date(),
        },
      });

      const productInfoUpdateObj = {
        product_item_group_id:
          updateDto.product_item_group_id ?? product_old.product_item_group_id,
        price: updateDto.price ?? product_old.price,
        tax_type: updateDto.tax_type ?? product_old.tax_type,
        tax_rate: updateDto.tax_rate ?? product_old.tax_rate,
        is_ingredients: updateDto.is_ingredients ?? product_old.is_ingredients,
        price_deviation_limit:
          updateDto.price_deviation_limit ?? product_old.price_deviation_limit,
        info: updateDto.info ?? product_old.info,
      };

      this.logger.warn(productInfoUpdateObj);

      await this.db_tenant.tb_product_info.update({
        where: {
          product_id: id,
        },
        data: {
          ...productInfoUpdateObj,
        },
      });

      if (updateDto.locations) {
        if (updateDto.locations.add) {
          const productLocationAddObj = updateDto.locations?.add?.map(
            (location) => ({
              product_id: id,
              location_id: location.location_id,
            }),
          );

          this.logger.warn(productLocationAddObj);

          await transactionClient.tb_product_location.createMany({
            data: productLocationAddObj,
          });
        }

        if (updateDto.locations.update) {
          const productLocationUpdateObj = updateDto.locations?.update?.map(
            (location) => ({
              id: location.product_location_id,
              location_id: location.location_id,
            }),
          );

          this.logger.warn(productLocationUpdateObj);

          await Promise.all(
            productLocationUpdateObj.map(async (location) => {
              await transactionClient.tb_product_location.update({
                where: { id: location.id, product_id: id },
                data: {
                  location_id: location.location_id,
                },
              });
            }),
          );
        }

        if (updateDto.locations.remove) {
          const productLocationRemoveObj = updateDto.locations?.remove?.map(
            (location) => ({
              id: location.product_location_id,
            }),
          );

          this.logger.warn(productLocationRemoveObj);

          await transactionClient.tb_product_location.deleteMany({
            where: {
              id: {
                in: productLocationRemoveObj.map((location) => location.id),
              },
            },
          });
        }
      }

      if (updateDto.orderUnits) {
        if (updateDto.orderUnits.add) {
          const productOrderUnitAddObj: any = updateDto.orderUnits?.add?.map(
            (unit) => ({
              product_id: id,
              unit_type: enum_unit_type.order_unit,
              from_unit_id: unit.unit_id,
              from_unit_qty: unit.unit_quantity,
              to_unit_id: unit.to_unit_id,
              to_unit_qty: unit.to_unit_quantity,
              description: unit.description,
              created_by_id: user_id,
              created_at: new Date(),
              updated_by_id: user_id,
              updated_at: new Date(),
            }),
          );

          this.logger.warn(productOrderUnitAddObj);

          await transactionClient.tb_unit_conversion.createMany({
            data: productOrderUnitAddObj,
          });
        }

        if (updateDto.orderUnits.update) {
          const productOrderUnitUpdateObj: any =
            updateDto.orderUnits?.update?.map((unit) => ({
              id: unit.product_order_unit_id,
              from_unit_id: unit.unit_id,
              from_unit_qty: unit.unit_quantity,
              to_unit_id: unit.to_unit_id,
              to_unit_qty: unit.to_unit_quantity,
              description: unit.description,
              updated_by_id: user_id,
              updated_at: new Date(),
            }));

          this.logger.warn(productOrderUnitUpdateObj);

          await Promise.all(
            productOrderUnitUpdateObj.map(async (unit) => {
              await transactionClient.tb_unit_conversion.update({
                where: { id: unit.id },
                data: unit,
              });
            }),
          );
        }

        if (updateDto.orderUnits.remove) {
          const productOrderUnitRemoveObj = updateDto.orderUnits?.remove?.map(
            (unit) => ({
              id: unit.product_order_unit_id,
            }),
          );

          this.logger.warn(productOrderUnitRemoveObj);

          await transactionClient.tb_unit_conversion.deleteMany({
            where: {
              id: {
                in: productOrderUnitRemoveObj.map((unit) => unit.id),
              },
            },
          });
        }
      }

      if (updateDto.ingredientUnits) {
        if (updateDto.ingredientUnits.add) {
          const productIngredientUnitAddObj: any =
            updateDto.ingredientUnits?.add?.map((unit) => ({
              product_id: id,
              unit_type: enum_unit_type.ingredient_unit,
              from_unit_id: unit.unit_id,
              from_unit_qty: unit.unit_quantity,
              to_unit_id: unit.to_unit_id,
              to_unit_qty: unit.to_unit_quantity,
              description: unit.description,
              created_by_id: user_id,
              created_at: new Date(),
              updated_by_id: user_id,
              updated_at: new Date(),
            }));

          this.logger.warn(productIngredientUnitAddObj);

          await transactionClient.tb_unit_conversion.createMany({
            data: productIngredientUnitAddObj,
          });
        }

        if (updateDto.ingredientUnits.update) {
          const productIngredientUnitUpdateObj: any =
            updateDto.ingredientUnits?.update?.map((unit) => ({
              id: unit.product_order_unit_id,
              from_unit_id: unit.unit_id,
              from_unit_qty: unit.unit_quantity,
              to_unit_id: unit.to_unit_id,
              to_unit_qty: unit.to_unit_quantity,
              description: unit.description,
              updated_by_id: user_id,
              updated_at: new Date(),
            }));

          this.logger.warn(productIngredientUnitUpdateObj);

          await Promise.all(
            productIngredientUnitUpdateObj.map(async (unit) => {
              await transactionClient.tb_unit_conversion.update({
                where: { id: unit.id },
                data: unit,
              });
            }),
          );
        }

        if (updateDto.ingredientUnits.remove) {
          const productIngredientUnitRemoveObj =
            updateDto.ingredientUnits?.remove?.map((unit) => ({
              id: unit.product_order_unit_id,
            }));

          this.logger.warn(productIngredientUnitRemoveObj);

          await transactionClient.tb_unit_conversion.deleteMany({
            where: {
              id: {
                in: productIngredientUnitRemoveObj.map((unit) => unit.id),
              },
            },
          });
        }
      }

      const res: ResponseId<string> = {
        id: id,
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
    this.db_tenant =
      await this.prismaClientManager.getTenantDB(business_unit_id);
    const oneObj = await this._getById(this.db_tenant, id);

    if (!oneObj) {
      throw new NotFoundException('Product not found');
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
    return tx;
  }
}
