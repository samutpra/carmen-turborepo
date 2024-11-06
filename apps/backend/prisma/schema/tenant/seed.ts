import { PrismaClient as dbTenant } from '@prisma-carmen-client-tenant';

const prisma = new dbTenant();

async function main() {
  /// create, update database
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
