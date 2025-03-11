import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as prismaClientTenant } from '@prisma/client';

@Injectable()
export class PrismaClientManagerService implements OnModuleDestroy {
  private clients: {
    [key: string]: { client: prismaClientTenant; url: string };
  } = {};

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
