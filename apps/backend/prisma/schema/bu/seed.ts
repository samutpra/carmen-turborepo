import { PrismaClient as dbTenant } from '@prisma-carmen-client-tenant';

const db_tenant = new dbTenant();

async function main() {
  /// create, update database
}

main()
  .then(async () => {
    await db_tenant.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db_tenant.$disconnect();
    process.exit(1);
  });
