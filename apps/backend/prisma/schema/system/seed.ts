import { Prisma, PrismaClient as dbSystem } from '@prisma-carmen-client/system';

const prisma = new dbSystem();

async function main() {
  await prisma.userTenant.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.company.deleteMany({});

  const company1Obj: Prisma.CompanyCreateInput = {
    code: 'test_company',
    name: 'Test Company',
  };

  const company1 = await prisma.company.upsert({
    where: {
      code: company1Obj.code,
    },
    update: {},
    create: company1Obj,
  });

  const user1Obj: Prisma.UserCreateInput = {
    username: 'user1',
  };

  const user1 = await prisma.user.upsert({
    where: { username: user1Obj.username },
    update: {},
    create: user1Obj,
  });

  const user2Obj: Prisma.UserCreateInput = {
    username: 'user2',
  };

  const user2 = await prisma.user.upsert({
    where: { username: user2Obj.username },
    update: {},
    create: user2Obj,
  });

  const tenant1Obj: Prisma.TenantCreateInput = {
    code: 'tenant_1',
    name: 'tenant 1',
    Company: {
      //create: company1Obj,

      connectOrCreate: {
        where: {
          code: company1Obj.code,
        },
        create: company1Obj,
      },
      connect: company1,
    },
  };

  const tenant1 = await prisma.tenant.create({
    data: tenant1Obj,
  });

  const tenant2Obj: Prisma.TenantCreateInput = {
    code: 'tenant_2',
    name: 'tenant 2',
    Company: {
      connect: company1,
    },
  };

  const tenant2 = await prisma.tenant.create({
    data: tenant2Obj,
  });

  const userTenant1Obj: Prisma.UserTenantCreateInput = {
    Tenant: {
      connect: tenant1,
    },
    User: {
      connect: user1,
    },
  };

  const userTenant1 = await prisma.userTenant.create({
    data: userTenant1Obj,
  });

  const userTenant2Obj: Prisma.UserTenantCreateInput = {
    Tenant: {
      connect: tenant1,
    },
    User: {
      connect: user2,
    },
  };

  const userTenant2 = await prisma.userTenant.create({
    data: userTenant2Obj,
  });
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
