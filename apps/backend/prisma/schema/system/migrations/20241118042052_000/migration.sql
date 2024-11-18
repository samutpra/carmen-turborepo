-- CreateEnum
CREATE TYPE "enum_subscription_status" AS ENUM ('Active', 'Inactive', 'expired');

-- CreateTable
CREATE TABLE "business_unit_module_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "businessUnitId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "business_unit_module_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_unit_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clusterId" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "isHq" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "business_unit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cluster_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "cluster_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "module_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_preference_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "isEmail" BOOLEAN NOT NULL DEFAULT false,
    "isSMS" BOOLEAN DEFAULT false,
    "isInApp" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "notification_preference_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "message" TEXT,
    "isRead" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "notification_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "hash" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "canGet" BOOLEAN NOT NULL DEFAULT true,
    "canCreate" BOOLEAN NOT NULL DEFAULT true,
    "canUpdate" BOOLEAN NOT NULL DEFAULT true,
    "canDelete" BOOLEAN NOT NULL DEFAULT true,
    "canPrint" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "permission_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "role_permission_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bussinessUnitId" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "role_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subscriptionId" UUID NOT NULL,
    "bussinessUnitId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "subscription_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clusterId" UUID NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "status" "enum_subscription_status" NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "subscription_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_business_unit_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "businessunitId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "user_business_unit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "firstname" VARCHAR(100),
    "middlename" VARCHAR(100),
    "lastname" VARCHAR(100),
    "bio" JSON,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "user_profile_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "user_role_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "consent" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "businessunitmodule_businessunitid_moduleid_u" ON "business_unit_module_table"("businessUnitId", "moduleId");

-- CreateIndex
CREATE INDEX "businessunit_code_idx" ON "business_unit_table"("code");

-- CreateIndex
CREATE INDEX "tenant_clusertid_idx" ON "business_unit_table"("clusterId");

-- CreateIndex
CREATE UNIQUE INDEX "businessunit_clusertid_code_u" ON "business_unit_table"("clusterId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_code_u" ON "cluster_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_name_u" ON "cluster_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "module_table_name_key" ON "module_table"("name");

-- CreateIndex
CREATE INDEX "module_name_idx" ON "module_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "notification_preference_table_userId_key" ON "notification_preference_table"("userId");

-- CreateIndex
CREATE INDEX "notificationpreference_userid_u" ON "notification_preference_table"("userId");

-- CreateIndex
CREATE INDEX "password_userid_idx" ON "password_table"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "permission_table_name_key" ON "permission_table"("name");

-- CreateIndex
CREATE INDEX "permission_name_u" ON "permission_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rolepermission_roleid_permissionid_u" ON "role_permission_table"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "role_table_name_key" ON "role_table"("name");

-- CreateIndex
CREATE INDEX "role_name_idx" ON "role_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_bussinessunitid_name_u" ON "role_table"("bussinessUnitId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptiondetail_subscriptionid_businessunitid_moduleid_u" ON "subscription_detail_table"("subscriptionId", "bussinessUnitId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "usertenant_userid_bussinessunitid_u" ON "user_business_unit_table"("userId", "businessunitId");

-- CreateIndex
CREATE INDEX "userprofile_firstname_lastname_idx" ON "user_profile_table"("firstname", "lastname");

-- CreateIndex
CREATE INDEX "userprofile_userid_idx" ON "user_profile_table"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userrole_userid_roleid_u" ON "user_role_table"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_username_key" ON "user_table"("username");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user_table"("email");

-- CreateIndex
CREATE INDEX "user_username_idx" ON "user_table"("username");

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_table" ADD CONSTRAINT "business_unit_table_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "cluster_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_table" ADD CONSTRAINT "business_unit_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_table" ADD CONSTRAINT "business_unit_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cluster_table" ADD CONSTRAINT "cluster_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cluster_table" ADD CONSTRAINT "cluster_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_table" ADD CONSTRAINT "module_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_table" ADD CONSTRAINT "module_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_preference_table" ADD CONSTRAINT "notification_preference_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_preference_table" ADD CONSTRAINT "notification_preference_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_preference_table" ADD CONSTRAINT "notification_preference_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "password_table" ADD CONSTRAINT "password_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_table" ADD CONSTRAINT "permission_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_table" ADD CONSTRAINT "permission_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permission_table" ADD CONSTRAINT "role_permission_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permission_table" ADD CONSTRAINT "role_permission_table_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permission_table" ADD CONSTRAINT "role_permission_table_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permission_table" ADD CONSTRAINT "role_permission_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_table" ADD CONSTRAINT "role_table_bussinessUnitId_fkey" FOREIGN KEY ("bussinessUnitId") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_table" ADD CONSTRAINT "role_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_table" ADD CONSTRAINT "role_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_bussinessUnitId_fkey" FOREIGN KEY ("bussinessUnitId") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "module_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_table" ADD CONSTRAINT "subscription_table_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "cluster_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_table" ADD CONSTRAINT "subscription_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_table" ADD CONSTRAINT "subscription_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_businessunitId_fkey" FOREIGN KEY ("businessunitId") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role_table" ADD CONSTRAINT "user_role_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role_table" ADD CONSTRAINT "user_role_table_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role_table" ADD CONSTRAINT "user_role_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role_table" ADD CONSTRAINT "user_role_table_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_createById_fkey" FOREIGN KEY ("createById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
