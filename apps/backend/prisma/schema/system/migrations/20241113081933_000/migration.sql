-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('Active', 'Inactive', 'expired');

-- CreateTable
CREATE TABLE "Password" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "hash" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
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

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bussinessUnitId" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "consent" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
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

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessUnit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clusterId" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "isHq" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "BusinessUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessUnitModule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "businessUnitId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "BusinessUnitModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cluster" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "Cluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "message" TEXT,
    "isRead" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationPreference" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "isEmail" BOOLEAN NOT NULL DEFAULT false,
    "isSMS" BOOLEAN DEFAULT false,
    "isInApp" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clusterId" UUID NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionDetail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subscriptionId" UUID NOT NULL,
    "bussinessUnitId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "SubscriptionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBusinessUnit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "businessunitId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "UserBusinessUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "password_userid_idx" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE INDEX "permission_name_u" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_bussinessunitid_name_u" ON "Role"("bussinessUnitId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "rolepermission_roleid_permissionid_u" ON "RolePermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "user_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "userprofile_firstname_lastname_idx" ON "UserProfile"("firstname", "lastname");

-- CreateIndex
CREATE INDEX "userprofile_userid_idx" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userrole_userid_roleid_u" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE INDEX "businessunit_code_idx" ON "BusinessUnit"("code");

-- CreateIndex
CREATE INDEX "tenant_clusertid_idx" ON "BusinessUnit"("clusterId");

-- CreateIndex
CREATE UNIQUE INDEX "businessunit_clusertid_code_u" ON "BusinessUnit"("clusterId", "code");

-- CreateIndex
CREATE INDEX "businessunitmodule_businessunitid_moduleid_u" ON "BusinessUnitModule"("businessUnitId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Cluster_code_key" ON "Cluster"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Cluster_name_key" ON "Cluster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- CreateIndex
CREATE INDEX "module_name_idx" ON "Module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreference_userId_key" ON "NotificationPreference"("userId");

-- CreateIndex
CREATE INDEX "notificationpreference_userid_u" ON "NotificationPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptiondetail_subscriptionid_businessunitid_moduleid_u" ON "SubscriptionDetail"("subscriptionId", "bussinessUnitId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "usertenant_userid_bussinessunitid_u" ON "UserBusinessUnit"("userId", "businessunitId");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_bussinessUnitId_fkey" FOREIGN KEY ("bussinessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnitModule" ADD CONSTRAINT "BusinessUnitModule_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnitModule" ADD CONSTRAINT "BusinessUnitModule_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnitModule" ADD CONSTRAINT "BusinessUnitModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessUnitModule" ADD CONSTRAINT "BusinessUnitModule_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cluster" ADD CONSTRAINT "Cluster_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NotificationPreference" ADD CONSTRAINT "NotificationPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubscriptionDetail" ADD CONSTRAINT "SubscriptionDetail_bussinessUnitId_fkey" FOREIGN KEY ("bussinessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubscriptionDetail" ADD CONSTRAINT "SubscriptionDetail_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubscriptionDetail" ADD CONSTRAINT "SubscriptionDetail_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubscriptionDetail" ADD CONSTRAINT "SubscriptionDetail_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SubscriptionDetail" ADD CONSTRAINT "SubscriptionDetail_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserBusinessUnit" ADD CONSTRAINT "UserBusinessUnit_businessunitId_fkey" FOREIGN KEY ("businessunitId") REFERENCES "BusinessUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserBusinessUnit" ADD CONSTRAINT "UserBusinessUnit_createById_fkey" FOREIGN KEY ("createById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserBusinessUnit" ADD CONSTRAINT "UserBusinessUnit_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserBusinessUnit" ADD CONSTRAINT "UserBusinessUnit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
