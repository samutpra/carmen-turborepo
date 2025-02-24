import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient as prismaSystemTenant } from "@prisma-carmen-client-system";
import { PrismaClient as prismaClientTenant } from "@prisma-carmen-client-tenant";

@Injectable()
export class PrismaClientManagerService implements OnModuleDestroy {
  private clients: {
    [key: string]: { client: prismaClientTenant; url: string };
  } = {};
  private systemDB: prismaSystemTenant;

  getSystemDB(): prismaSystemTenant {
    const system_tenant_id = "CARMEN_SYSTEM";
    let client = this.systemDB;

    if (!client) {
      const databaseUrl =
        process.env.DATABASE_URL_SYSTEM ||
        process.env.DATABASE_URL!.replace("public", system_tenant_id);

      client = new prismaSystemTenant({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });
    }

    this.systemDB = client;

    return client;
  }

  async getTenantDB(tenantId: string): Promise<prismaClientTenant> {
    const databaseUrl = await this.getDataBaseUrl(tenantId);

    if (!databaseUrl) {
      throw new Error(
        `Database connection URL not found for tenant: ${tenantId}`,
      );
    }

    let clientData = this.clients[tenantId];

    if (clientData) {
      // Check if the existing client is using the updated database URL
      if (clientData.url !== databaseUrl) {
        await clientData.client.$disconnect();
        clientData = null;
      }
    }

    if (!clientData) {
      const client = new prismaClientTenant({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });

      // Test the database connection
      try {
        await client.$connect();
      } catch (error) {
        throw new Error(
          `Failed to connect to the database for tenant: ${tenantId}`,
        );
      }

      this.clients[tenantId] = { client, url: databaseUrl };
    }

    return this.clients[tenantId].client;
  }

  async getDataBaseUrl(tenantId: string): Promise<string> {
    const businessUnit = await this.getSystemDB().tb_business_unit.findUnique({
      where: { id: tenantId },
      select: {
        db_connection: true,
      },
    });

    return businessUnit?.db_connection;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((clientData) =>
        clientData.client.$disconnect(),
      ),
    );

    await this.systemDB.$disconnect();
  }
}

// import { Injectable, OnModuleDestroy } from "@nestjs/common";
// import { PrismaClient as prismaSystemTenant } from "@prisma-carmen-client-system";
// import { PrismaClient as prismaClientTenant } from "@prisma-carmen-client-tenant";

// @Injectable()
// export class PrismaClientManagerService implements OnModuleDestroy {
//   private clients: { [key: string]: prismaClientTenant } = {};
//   private systemDB: prismaSystemTenant;

//   getSystemDB(): prismaSystemTenant {
//     const system_tenant_id = "CARMEN_SYSTEM";
//     let client = this.systemDB;

//     if (!client) {
//       const databaseUrl =
//         process.env.DATABASE_URL_SYSTEM ||
//         process.env.DATABASE_URL!.replace("public", system_tenant_id);

//       client = new prismaSystemTenant({
//         datasources: {
//           db: {
//             url: databaseUrl,
//           },
//         },
//       });
//     }

//     this.systemDB = client;

//     return client;
//   }

//   getTenantDB(tenantId: string): prismaClientTenant {
//     let client = this.clients[tenantId];

//     if (!client) {
//       const databaseUrl = process.env.DATABASE_URL!.replace(
//         "public",
//         "TENANT_" + tenantId,
//       );

//       console.log(databaseUrl, "databaseUrl");

//       client = new prismaClientTenant({
//         datasources: {
//           db: {
//             url: databaseUrl,
//           },
//         },
//       });

//       // setup prisma middlewares if any

//       this.clients[tenantId] = client;
//     }

//     return client;
//   }

//   async onModuleDestroy() {
//     await Promise.all(
//       Object.values(this.clients).map((client) => client.$disconnect()),
//     );

//     await this.systemDB.$disconnect();
//   }
// }
