import {
  Prisma,
  PrismaClient as dbSystem,
  permission_table,
} from '@prisma-carmen-client-system';

import { $Enums } from '@prisma-carmen-client-system';

const db_system = new dbSystem();

type _permission_item = {
  group: string;
  name: string;
  actions?: $Enums.enum_permission_action[] | null;
};

async function main() {
  // await prisma.userBusinessUnit.deleteMany({});
  // await prisma.user.deleteMany({});
  // await prisma.businessUnit.deleteMany({});
  // await prisma.cluster.deleteMany({});
  // const cluster1Obj: Prisma.ClusterCreateInput = {
  //   code: 'test_company',
  //   name: 'Test Company',
  // };
  // const cluster1 = await prisma.cluster.upsert({
  //   where: {
  //     code: cluster1Obj.code,
  //   },
  //   update: {},
  //   create: cluster1Obj,
  // });
  // const user1Obj: Prisma.UserCreateInput = {
  //   username: 'user1@carmensoftware.com',
  //   email: 'user1@carmensoftware.com',
  // };
  // const user1 = await prisma.user.upsert({
  //   where: { username: user1Obj.username },
  //   update: {},
  //   create: user1Obj,
  // });
  // const user2Obj: Prisma.UserCreateInput = {
  //   username: 'user2@carmensoftware.com',
  //   email: 'user2@carmensoftware.com',
  // };
  // const user2 = await prisma.user.upsert({
  //   where: { username: user2Obj.username },
  //   update: {},
  //   create: user2Obj,
  // });
  // const tenant1Obj: Prisma.BusinessUnitCreateInput = {
  //   code: 'tenant_1',
  //   name: 'tenant 1',
  //   isHq: true,
  //   Cluster: {
  //     connect: cluster1,
  //   },
  //   UserBusinessUnit: {
  //     connect: [user1, user2],
  //   },
  // };
  // const businessUnit1 = await prisma.businessUnit.create({
  //   data: tenant1Obj,
  // });
  // const businessUnit1Obj: Prisma.UserBusinessUnitCreateInput = {
  //   BusinessUnit: {
  //     connect: businessUnit1,
  //   },
  // };
  // const userBusinessUnit1 = await prisma.userBusinessUnit.create({
  //   data: businessUnit1Obj,
  // });

  const permission_list: _permission_item[] = [
    {
      group: 'menu',
      name: 'dashboard',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'procurement',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'product-management',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'vendor-management',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'configuration',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'store-operations',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'inventory-management',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'operational-planning',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'production',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'reporting-analytics',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'finance',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'system-administration',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'help-support',
      actions: [$Enums.enum_permission_action.read],
    },
    {
      group: 'menu',
      name: 'my-profile',
      actions: [$Enums.enum_permission_action.read],
    },
    // {
    //   group: 'menu',
    //   name: 'logout',
    //   actions: [$Enums.enum_permission_action.view],
    // },
  ];

  permission_list.map(async (item) => {
    item.actions?.map(async (action) => {
      const permission_tb = await db_system.permission_table.upsert({
        where: {
          group_name_action: {
            group: item.group,
            name: item.name,
            action: action,
          },
        },
        update: {},
        create: {
          group: item.group,
          name: item.name,
          action: action,
        },
      });
    });
  });

  // path: "/dashboard",
  // path: "/procurement",
  //         path: "/procurement/my-approvals",
  //         path: "/procurement/purchase-requests",
  //         path: "/procurement/purchase-orders",
  //         path: "/procurement/goods-received-note",
  //         path: "/procurement/credit-note",
  //         path: "/procurement/purchase-request-templates",
  // path: "/product-management",
  //         path: "/product-management/products",
  //         path: "/product-management/categories",
  //         path: "/product-management/reports",
  //         path: "/product-management/unit",
  // path: "/vendor-management",
  //         path: "/vendor-management/manage-vendors",
  //         path: "/vendor-management/price-lists",
  //         path: "/vendor-management/price-comparisons",
  // path: "/configuration",
  //         path: "/configuration/currency",
  //         path: "/configuration/delivery-point",
  //         path: "/configuration/category",
  //         path: "/configuration/store-location",
  //         path: "/configuration/department",
  // path: "/store-operations",
  //         path: "/store-operations/store-requisitions",
  //         path: "/store-operations/stock-replenishment",
  //         path: "/store-operations/wastage-reporting",
  // path: "/inventory-management",
  //         path: "/inventory-management/stock-overview",
  //         path: "/inventory-management/physical-count",
  //                 path: "/inventory-management/physical-count",
  //                 path: "/inventory-management/physical-count/history",
  //         path: "/inventory-management/spot-check",
  //                 path: "/inventory-management/spot-check/dashboard",
  //                 path: "/inventory-management/spot-check/new/zones",
  //                 path: "/inventory-management/spot-check/active",
  //                 path: "/inventory-management/spot-check/completed",
  //                 path: "/inventory-management/stock-take" ,
  //        path: "/inventory-management/inventory-valuation",
  //         path: "/inventory-management/stock-in",
  //         path: "/inventory-management/stock-out",
  //         path: "/inventory-management/transfer-between-locations",
  //         path: "/inventory-management/inventory-valuation",
  // path: "/operational-planning",
  //         path: "/operational-planning/recipes-management",
  //         path: "/operational-planning/menu-engineering",
  //         path: "/operational-planning/demand-forecasting",
  //         path: "/operational-planning/inventory-planning",
  // path: "/production",
  //         path: "/production/recipe-sexecution",
  //         path: "/production/batch-production",
  //         path: "/production/wastage-tracking",
  //         path: "/production/quality-control",
  // path: "/reporting-analytics",
  //         path: "/reporting-analytics/operational-reports",
  //         path: "/reporting-analytics/financial-reports",
  //         path: "/reporting-analytics/inventory-reports",
  //         path: "/reporting-analytics/vendor-performance",
  //         path: "/reporting-analytics/cost-analysis",
  //         path: "/reporting-analytics/sales-analysis",
  // path: "/finance",
  //         path: "/finance/account-code-mapping",
  //         path: "/finance/currency-management",
  //         path: "/finance/exchange-rates",
  //         path: "/finance/department-list",
  //         path: "/finance/budget-planning-and-control",
  // path: "/system-administration",
  //         path: "/system-administration/user-management",
  //         path: "/system-administration/location-management",
  //         path: "/system-administration/workflow-management",
  //         path: "/system-administration/general-settings",
  //         path: "/system-administration/notification-preferences",
  //         path: "/system-administration/license-management",
  //         path: "/system-administration/security-settings",
  //         path: "/system-administration/data-backup-and-recovery",
  //         path: "/system-administration/system-integrations",
  // path: "/help-support",
  //         path: "/help-support/user-manuals",
  //         path: "/help-support/video-tutorials",
  //         path: "/help-support/faqs",
  //         path: "/help-support/support-ticket-system",
  //         path: "/help-support/system-updates-and-release-notes",
}

main()
  .then(async () => {
    await db_system.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db_system.$disconnect();
    process.exit(1);
  });
