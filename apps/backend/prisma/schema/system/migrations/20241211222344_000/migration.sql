-- CreateEnum
CREATE TYPE "enum_subscription_status" AS ENUM ('active', 'inactive', 'expired');

-- CreateEnum
CREATE TYPE "enum_permission_action" AS ENUM ('view', 'view_all', 'create', 'update', 'delete', 'own_delete', 'print', 'export');

-- CreateTable
CREATE TABLE "business_unit_module_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_unit_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "business_unit_module_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_unit_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cluster_id" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_hq" BOOLEAN DEFAULT true,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "business_unit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cluster_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "info" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "cluster_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "module_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_preference_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "is_email" BOOLEAN NOT NULL DEFAULT false,
    "is_sms" BOOLEAN DEFAULT false,
    "is_in_app" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "notification_preference_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "message" TEXT,
    "is_read" BOOLEAN DEFAULT false,
    "is_sent" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "notification_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "hash" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "expiredOn" DATE NOT NULL DEFAULT (now() + '90 days'::interval),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "password_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "group" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "action" "enum_permission_action" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "permission_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subscription_id" UUID NOT NULL,
    "business_unit_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "subscription_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cluster_id" UUID NOT NULL,
    "subscription_number" VARCHAR NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" "enum_subscription_status" NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "subscription_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_business_unit_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "business_unit_id" UUID,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "user_business_unit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "firstname" VARCHAR(100) NOT NULL DEFAULT '',
    "middlename" VARCHAR(100) DEFAULT '',
    "lastname" VARCHAR(100) DEFAULT '',
    "bio" JSON DEFAULT '{}',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "user_profile_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "is_consent" BOOLEAN DEFAULT false,
    "consent" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_role_permission_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "application_role_permission_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_role_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_unit_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "application_role_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_application_role_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "application_role_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "user_application_role_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "businessunitmodule_business_unit_id_module_id_u" ON "business_unit_module_table"("business_unit_id", "module_id");

-- CreateIndex
CREATE INDEX "businessunit_code_idx" ON "business_unit_table"("code");

-- CreateIndex
CREATE INDEX "tenant_clusertid_idx" ON "business_unit_table"("cluster_id");

-- CreateIndex
CREATE UNIQUE INDEX "businessunit_clusertid_code_u" ON "business_unit_table"("cluster_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_code_u" ON "cluster_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_name_u" ON "cluster_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "module_table_name_key" ON "module_table"("name");

-- CreateIndex
CREATE INDEX "module_name_id_u" ON "module_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "notification_preference_table_user_id_key" ON "notification_preference_table"("user_id");

-- CreateIndex
CREATE INDEX "notificationpreference_user_id_u" ON "notification_preference_table"("user_id");

-- CreateIndex
CREATE INDEX "password_user_id_idx" ON "password_table"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_group_name_action_u" ON "permission_table"("group", "name", "action");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptiondetail_subscription_id_business_unit_id_module_id_u" ON "subscription_detail_table"("subscription_id", "business_unit_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_cluster_id_subscription_number_u" ON "subscription_table"("cluster_id", "subscription_number");

-- CreateIndex
CREATE UNIQUE INDEX "usertenant_user_id_business_unit_id_u" ON "user_business_unit_table"("user_id", "business_unit_id");

-- CreateIndex
CREATE INDEX "userprofile_firstname_lastname_idx" ON "user_profile_table"("firstname", "lastname");

-- CreateIndex
CREATE INDEX "userprofile_user_id_idx" ON "user_profile_table"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_username_key" ON "user_table"("username");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user_table"("email");

-- CreateIndex
CREATE INDEX "user_username_idx" ON "user_table"("username");

-- CreateIndex
CREATE UNIQUE INDEX "applicationrolepermission_application_role_id_permission_id_u" ON "application_role_permission_table"("application_role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_role_table_name_key" ON "application_role_table"("name");

-- CreateIndex
CREATE INDEX "application_role_name_idx" ON "application_role_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "application_role_business_unit_id_name_u" ON "application_role_table"("business_unit_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "userapplicationrole_user_id_application_role_id_u" ON "user_application_role_table"("user_id", "application_role_id");

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_module_table" ADD CONSTRAINT "business_unit_module_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_table" ADD CONSTRAINT "business_unit_table_cluster_id_fkey" FOREIGN KEY ("cluster_id") REFERENCES "cluster_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_table" ADD CONSTRAINT "business_unit_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_unit_table" ADD CONSTRAINT "business_unit_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cluster_table" ADD CONSTRAINT "cluster_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cluster_table" ADD CONSTRAINT "cluster_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_table" ADD CONSTRAINT "module_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "module_table" ADD CONSTRAINT "module_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_preference_table" ADD CONSTRAINT "notification_preference_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_preference_table" ADD CONSTRAINT "notification_preference_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_preference_table" ADD CONSTRAINT "notification_preference_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_table" ADD CONSTRAINT "notification_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "password_table" ADD CONSTRAINT "password_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "password_table" ADD CONSTRAINT "password_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_table" ADD CONSTRAINT "permission_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permission_table" ADD CONSTRAINT "permission_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscription_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_detail_table" ADD CONSTRAINT "subscription_detail_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_table" ADD CONSTRAINT "subscription_table_cluster_id_fkey" FOREIGN KEY ("cluster_id") REFERENCES "cluster_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_table" ADD CONSTRAINT "subscription_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription_table" ADD CONSTRAINT "subscription_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_business_unit_table" ADD CONSTRAINT "user_business_unit_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile_table" ADD CONSTRAINT "user_profile_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_permission_table" ADD CONSTRAINT "application_role_permission_table_application_role_id_fkey" FOREIGN KEY ("application_role_id") REFERENCES "application_role_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_permission_table" ADD CONSTRAINT "application_role_permission_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_permission_table" ADD CONSTRAINT "application_role_permission_table_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_permission_table" ADD CONSTRAINT "application_role_permission_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_table" ADD CONSTRAINT "application_role_table_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_table" ADD CONSTRAINT "application_role_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "application_role_table" ADD CONSTRAINT "application_role_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_application_role_table" ADD CONSTRAINT "user_application_role_table_application_role_id_fkey" FOREIGN KEY ("application_role_id") REFERENCES "application_role_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_application_role_table" ADD CONSTRAINT "user_application_role_table_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_application_role_table" ADD CONSTRAINT "user_application_role_table_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_application_role_table" ADD CONSTRAINT "user_application_role_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
