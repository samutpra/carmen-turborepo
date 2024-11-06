import {
  BusinessUnit,
  Prisma,
  User,
  UserBusinessUnit,
  PrismaClient as dbSystem,
} from '@prisma-carmen-client/system';

const prisma = new dbSystem();

async function main() {
  await prisma.userBusinessUnit.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.businessUnit.deleteMany({});
  await prisma.cluster.deleteMany({});

  const cluster1Obj: Prisma.ClusterCreateInput = {
    code: 'test_company',
    name: 'Test Company',
  };

  const cluster1 = await prisma.cluster.upsert({
    where: {
      code: cluster1Obj.code,
    },
    update: {},
    create: cluster1Obj,
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

  const tenant1Obj: Prisma.BusinessUnitCreateInput = {
    code: 'tenant_1',
    name: 'tenant 1',
    isHq: true,

    Cluster: {
      connect: cluster1,
    },
    UserBusinessUnit: {
      connect: [user1, user2],
    },
  };

  const businessUnit1 = await prisma.businessUnit.create({
    data: tenant1Obj,
  });

  const businessUnit1Obj: Prisma.UserBusinessUnitCreateInput = {
    BusinessUnit: {
      connect: businessUnit1,
    },
  };

  const userBusinessUnit1 = await prisma.userBusinessUnit.create({
    data: businessUnit1Obj,
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
