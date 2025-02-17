-- CreateEnum
CREATE TYPE "enum_subscription_status" AS ENUM ('active', 'inactive', 'expired');

-- CreateEnum
CREATE TYPE "enum_token_type" AS ENUM ('access_token', 'refresh_token');

-- CreateTable
CREATE TABLE "tb_application_role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_unit_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_application_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_application_role_tb_permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "application_role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_application_role_tb_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_business_unit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cluster_id" UUID NOT NULL,
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_hq" BOOLEAN DEFAULT true,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_business_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_business_unit_tb_module" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_unit_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_business_unit_tb_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cluster" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_cluster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_message_format" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "message" TEXT,
    "is_email" BOOLEAN NOT NULL DEFAULT false,
    "is_sms" BOOLEAN DEFAULT false,
    "is_in_app" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_message_format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_module" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_notification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "message" TEXT,
    "is_read" BOOLEAN DEFAULT false,
    "is_sent" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_password" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "hash" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "expired_on" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() + '90 days'::interval),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "tb_password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "group" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cluster_id" UUID NOT NULL,
    "subscription_number" VARCHAR NOT NULL,
    "start_date" TIMESTAMPTZ(6) NOT NULL,
    "end_date" TIMESTAMPTZ(6) NOT NULL,
    "status" "enum_subscription_status" NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_subscription_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subscription_id" UUID NOT NULL,
    "business_unit_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_subscription_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN DEFAULT false,
    "is_consent" BOOLEAN DEFAULT false,
    "consent" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "firstname" VARCHAR(100) NOT NULL DEFAULT '',
    "middlename" VARCHAR(100) DEFAULT '',
    "lastname" VARCHAR(100) DEFAULT '',
    "bio" JSON DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_tb_application_role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "application_role_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_user_tb_application_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_tb_business_unit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "business_unit_id" UUID,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_user_tb_business_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_login_session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "token_type" "enum_token_type" NOT NULL DEFAULT 'access_token',
    "user_id" UUID NOT NULL,
    "expired_on" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() + '1 day'::interval),

    CONSTRAINT "tb_user_login_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_currency_iso" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "iso_code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,

    CONSTRAINT "tb_currency_iso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cluster_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "cluster_id" UUID NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_cluster_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_application_role_name_key" ON "tb_application_role"("name");

-- CreateIndex
CREATE INDEX "tb_application_role_name_idx" ON "tb_application_role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "applicationrole_business_unit_name_u" ON "tb_application_role"("business_unit_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "applicationrole_permission_application_role_permission_u" ON "tb_application_role_tb_permission"("application_role_id", "permission_id");

-- CreateIndex
CREATE INDEX "businessunit_cluster_idx" ON "tb_business_unit"("cluster_id");

-- CreateIndex
CREATE INDEX "businessunit_code_idx" ON "tb_business_unit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "businessunit_cluster_code_u" ON "tb_business_unit"("cluster_id", "code");

-- CreateIndex
CREATE INDEX "businessunit_module_business_unit_module_u" ON "tb_business_unit_tb_module"("business_unit_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_code_u" ON "tb_cluster"("code");

-- CreateIndex
CREATE UNIQUE INDEX "cluster_name_u" ON "tb_cluster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_message_format_name_key" ON "tb_message_format"("name");

-- CreateIndex
CREATE INDEX "messageformat_name_u" ON "tb_message_format"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_module_name_key" ON "tb_module"("name");

-- CreateIndex
CREATE INDEX "module_name_u" ON "tb_module"("name");

-- CreateIndex
CREATE INDEX "password_user_idx" ON "tb_password"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_group_name_u" ON "tb_permission"("group", "name");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_cluster_subscription_number_u" ON "tb_subscription"("cluster_id", "subscription_number");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptiondetail_subscription_business_unit_module_u" ON "tb_subscription_detail"("subscription_id", "business_unit_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_username_key" ON "tb_user"("username");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "tb_user"("email");

-- CreateIndex
CREATE INDEX "user_username_idx" ON "tb_user"("username");

-- CreateIndex
CREATE INDEX "userprofile_firstname_lastname_idx" ON "tb_user_profile"("firstname", "lastname");

-- CreateIndex
CREATE INDEX "userprofile_user_idx" ON "tb_user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_applicationrole_user_application_role_u" ON "tb_user_tb_application_role"("user_id", "application_role_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_businessunit_user_business_unit_u" ON "tb_user_tb_business_unit"("user_id", "business_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_login_session_token_key" ON "tb_user_login_session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tb_currency_iso_iso_code_key" ON "tb_currency_iso"("iso_code");

-- CreateIndex
CREATE UNIQUE INDEX "user_cluster_u" ON "tb_cluster_user"("user_id", "cluster_id");

-- AddForeignKey
ALTER TABLE "tb_application_role" ADD CONSTRAINT "tb_application_role_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_application_role" ADD CONSTRAINT "tb_application_role_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_application_role" ADD CONSTRAINT "tb_application_role_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_application_role_tb_permission" ADD CONSTRAINT "tb_application_role_tb_permission_application_role_id_fkey" FOREIGN KEY ("application_role_id") REFERENCES "tb_application_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_application_role_tb_permission" ADD CONSTRAINT "tb_application_role_tb_permission_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_application_role_tb_permission" ADD CONSTRAINT "tb_application_role_tb_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "tb_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_application_role_tb_permission" ADD CONSTRAINT "tb_application_role_tb_permission_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit" ADD CONSTRAINT "tb_business_unit_cluster_id_fkey" FOREIGN KEY ("cluster_id") REFERENCES "tb_cluster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit" ADD CONSTRAINT "tb_business_unit_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit" ADD CONSTRAINT "tb_business_unit_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit_tb_module" ADD CONSTRAINT "tb_business_unit_tb_module_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit_tb_module" ADD CONSTRAINT "tb_business_unit_tb_module_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit_tb_module" ADD CONSTRAINT "tb_business_unit_tb_module_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "tb_module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_business_unit_tb_module" ADD CONSTRAINT "tb_business_unit_tb_module_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_cluster" ADD CONSTRAINT "tb_cluster_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_cluster" ADD CONSTRAINT "tb_cluster_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_message_format" ADD CONSTRAINT "tb_message_format_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_message_format" ADD CONSTRAINT "tb_message_format_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_module" ADD CONSTRAINT "tb_module_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_module" ADD CONSTRAINT "tb_module_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_notification" ADD CONSTRAINT "tb_notification_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_notification" ADD CONSTRAINT "tb_notification_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_notification" ADD CONSTRAINT "tb_notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_password" ADD CONSTRAINT "tb_password_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_password" ADD CONSTRAINT "tb_password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_permission" ADD CONSTRAINT "tb_permission_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_permission" ADD CONSTRAINT "tb_permission_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription" ADD CONSTRAINT "tb_subscription_cluster_id_fkey" FOREIGN KEY ("cluster_id") REFERENCES "tb_cluster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription" ADD CONSTRAINT "tb_subscription_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription" ADD CONSTRAINT "tb_subscription_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription_detail" ADD CONSTRAINT "tb_subscription_detail_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription_detail" ADD CONSTRAINT "tb_subscription_detail_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription_detail" ADD CONSTRAINT "tb_subscription_detail_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "tb_module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription_detail" ADD CONSTRAINT "tb_subscription_detail_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "tb_subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_subscription_detail" ADD CONSTRAINT "tb_subscription_detail_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_profile" ADD CONSTRAINT "tb_user_profile_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_profile" ADD CONSTRAINT "tb_user_profile_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_profile" ADD CONSTRAINT "tb_user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_application_role" ADD CONSTRAINT "tb_user_tb_application_role_application_role_id_fkey" FOREIGN KEY ("application_role_id") REFERENCES "tb_application_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_application_role" ADD CONSTRAINT "tb_user_tb_application_role_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_application_role" ADD CONSTRAINT "tb_user_tb_application_role_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_application_role" ADD CONSTRAINT "tb_user_tb_application_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_business_unit" ADD CONSTRAINT "tb_user_tb_business_unit_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_business_unit" ADD CONSTRAINT "tb_user_tb_business_unit_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_business_unit" ADD CONSTRAINT "tb_user_tb_business_unit_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_tb_business_unit" ADD CONSTRAINT "tb_user_tb_business_unit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_login_session" ADD CONSTRAINT "tb_user_login_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_cluster_user" ADD CONSTRAINT "tb_cluster_user_cluster_id_fkey" FOREIGN KEY ("cluster_id") REFERENCES "tb_cluster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_cluster_user" ADD CONSTRAINT "tb_cluster_user_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_cluster_user" ADD CONSTRAINT "tb_cluster_user_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_cluster_user" ADD CONSTRAINT "tb_cluster_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
