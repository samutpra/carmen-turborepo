import {
  Injectable,
  OnModuleDestroy,
} from '@nestjs/common';
import {
  PrismaClient as prismaSystemTenant,
} from '@prisma-carmen-client-system';
import {
  PrismaClient as prismaClientTenant,
} from '@prisma-carmen-client-tenant';

@Injectable()
export class PrismaClientManagerService implements OnModuleDestroy {
  private clients: { [key: string]: prismaClientTenant } = {};
  private systemDB: prismaSystemTenant;

  getSystemDB(): prismaSystemTenant {
    const system_tenant_id = 'CARMEN_SYSTEM';
    let client = this.systemDB;

    if (!client) {
      const databaseUrl =
        process.env.DATABASE_URL_SYSTEM ||
        process.env.DATABASE_URL!.replace('public', system_tenant_id);

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

  getTenantDB(tenantId: string): prismaClientTenant {
    let client = this.clients[tenantId];

    if (!client) {
      const databaseUrl = process.env.DATABASE_URL!.replace(
        'public',
        'TENANT_' + tenantId,
      );

      client = new prismaClientTenant({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });

      // setup prisma middlewares if any

      this.clients[tenantId] = client;
    }

    return client;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );

    await this.systemDB.$disconnect();
  }
}
