CREATE TYPE "enum_platform_role" AS ENUM (
  'platform_admin',
  'support_manager',
  'support_staff',
  'security_officer',
  'integration_developer',
  'user'
);

CREATE TYPE "enum_token_type" AS ENUM (
  'access_token',
  'refresh_token'
);

CREATE TYPE "enum_cluster_user_role" AS ENUM (
  'admin',
  'user'
);

CREATE TYPE "enum_user_business_unit_role" AS ENUM (
  'admin',
  'user'
);

CREATE TYPE "enum_subscription_status" AS ENUM (
  'active',
  'inactive',
  'expired'
);

CREATE TABLE "tb_currency_iso" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "iso_code" varchar(3) UNIQUE NOT NULL,
  "name" varchar(255) NOT NULL,
  "symbol" varchar(10) NOT NULL
);

CREATE TABLE "tb_user" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "username" text UNIQUE NOT NULL,
  "email" text NOT NULL,
  "platform_role" enum_platform_role NOT NULL DEFAULT 'user',
  "is_active" bool DEFAULT false,
  "is_consent" bool DEFAULT false,
  "consent_at" timestamptz,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_password" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "hash" text NOT NULL,
  "is_active" bool DEFAULT false,
  "expired_on" timestamptz NOT NULL DEFAULT (now() + '90 day'::interval),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid
);

CREATE TABLE "tb_user_login_session" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "token" text UNIQUE NOT NULL,
  "token_type" enum_token_type NOT NULL DEFAULT 'access_token',
  "user_id" uuid NOT NULL,
  "expired_on" timestamptz NOT NULL DEFAULT (now() + '1 day'::interval)
);

CREATE TABLE "tb_user_profile" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid,
  "firstname" varchar(100) NOT NULL DEFAULT '',
  "middlename" varchar(100) DEFAULT '',
  "lastname" varchar(100) DEFAULT '',
  "bio" json DEFAULT '{}',
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_cluster" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(30) UNIQUE NOT NULL,
  "name" text UNIQUE NOT NULL,
  "is_active" bool DEFAULT true,
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_business_unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "cluster_id" uuid NOT NULL,
  "code" varchar(30) NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "is_hq" bool DEFAULT true,
  "is_active" bool DEFAULT true,
  "db_connection" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_cluster_user" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid,
  "cluster_id" uuid NOT NULL,
  "is_active" bool DEFAULT true,
  "role" enum_cluster_user_role NOT NULL DEFAULT 'user',
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_user_tb_business_unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid,
  "business_unit_id" uuid,
  "role" enum_user_business_unit_role NOT NULL DEFAULT 'user',
  "is_default" bool DEFAULT false,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_module" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_business_unit_tb_module" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "business_unit_id" uuid NOT NULL,
  "module_id" uuid NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_subscription" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "cluster_id" uuid NOT NULL,
  "subscription_number" varchar NOT NULL,
  "start_date" timestamptz NOT NULL,
  "end_date" timestamptz NOT NULL,
  "status" enum_subscription_status NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_subscription_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "subscription_id" uuid NOT NULL,
  "business_unit_id" uuid NOT NULL,
  "module_id" uuid NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_application_role" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "business_unit_id" uuid NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_user_tb_application_role" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "application_role_id" uuid NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_permission" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "group" varchar NOT NULL,
  "name" varchar NOT NULL,
  "description" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_application_role_tb_permission" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "application_role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_message_format" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "message" text,
  "is_email" bool NOT NULL DEFAULT false,
  "is_sms" bool DEFAULT false,
  "is_in_app" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_notification" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "from_user_id" uuid NOT NULL,
  "to_user_id" uuid NOT NULL,
  "message" text,
  "is_read" bool DEFAULT false,
  "is_sent" bool DEFAULT false,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE INDEX "user_username_idx" ON "tb_user" ("username");

CREATE INDEX "user_email_idx" ON "tb_user" ("email");

CREATE INDEX "password_user_idx" ON "tb_password" ("user_id");

CREATE INDEX "userprofile_user_idx" ON "tb_user_profile" ("user_id");

CREATE INDEX "userprofile_firstname_lastname_idx" ON "tb_user_profile" ("firstname", "lastname");

CREATE UNIQUE INDEX "cluster_code_u" ON "tb_cluster" ("code");

CREATE UNIQUE INDEX "cluster_name_u" ON "tb_cluster" ("name");

CREATE INDEX "business_unit_cluster_idx" ON "tb_business_unit" ("cluster_id");

CREATE INDEX "business_unit_code_idx" ON "tb_business_unit" ("code");

CREATE UNIQUE INDEX "business_unit_cluster_code_u" ON "tb_business_unit" ("cluster_id", "code");

CREATE UNIQUE INDEX "user_cluster_u" ON "tb_cluster_user" ("user_id", "cluster_id");

CREATE UNIQUE INDEX "user_businessunit_user_business_unit_u" ON "tb_user_tb_business_unit" ("user_id", "business_unit_id");

CREATE INDEX "module_name_u" ON "tb_module" ("name");

CREATE INDEX "businessunit_module_business_unit_module_u" ON "tb_business_unit_tb_module" ("business_unit_id", "module_id");

CREATE UNIQUE INDEX "subscription_cluster_subscription_number_u" ON "tb_subscription" ("cluster_id", "subscription_number");

CREATE UNIQUE INDEX "subscriptiondetail_subscription_business_unit_module_u" ON "tb_subscription_detail" ("subscription_id", "business_unit_id", "module_id");

CREATE INDEX "tb_application_role_name_idx" ON "tb_application_role" ("name");

CREATE UNIQUE INDEX "applicationrole_business_unit_name_u" ON "tb_application_role" ("business_unit_id", "name");

CREATE UNIQUE INDEX "user_applicationrole_user_application_role_u" ON "tb_user_tb_application_role" ("user_id", "application_role_id");

CREATE UNIQUE INDEX "permission_group_name_u" ON "tb_permission" ("group", "name");

CREATE UNIQUE INDEX "applicationrole_permission_application_role_permission_u" ON "tb_application_role_tb_permission" ("application_role_id", "permission_id");

CREATE INDEX "messageformat_name_u" ON "tb_message_format" ("name");

ALTER TABLE "tb_user" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_password" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_password" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_login_session" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_profile" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_profile" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_profile" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_cluster" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_cluster" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_business_unit" ADD FOREIGN KEY ("cluster_id") REFERENCES "tb_cluster" ("id");

ALTER TABLE "tb_business_unit" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_business_unit" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_cluster_user" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_cluster_user" ADD FOREIGN KEY ("cluster_id") REFERENCES "tb_cluster" ("id");

ALTER TABLE "tb_cluster_user" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_cluster_user" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_tb_business_unit" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_tb_business_unit" ADD FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit" ("id");

ALTER TABLE "tb_user_tb_business_unit" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_tb_business_unit" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_module" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_module" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_business_unit_tb_module" ADD FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit" ("id");

ALTER TABLE "tb_business_unit_tb_module" ADD FOREIGN KEY ("module_id") REFERENCES "tb_module" ("id");

ALTER TABLE "tb_business_unit_tb_module" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_business_unit_tb_module" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_subscription" ADD FOREIGN KEY ("cluster_id") REFERENCES "tb_cluster" ("id");

ALTER TABLE "tb_subscription" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_subscription" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_subscription_detail" ADD FOREIGN KEY ("subscription_id") REFERENCES "tb_subscription" ("id");

ALTER TABLE "tb_subscription_detail" ADD FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit" ("id");

ALTER TABLE "tb_subscription_detail" ADD FOREIGN KEY ("module_id") REFERENCES "tb_module" ("id");

ALTER TABLE "tb_subscription_detail" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_subscription_detail" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_application_role" ADD FOREIGN KEY ("business_unit_id") REFERENCES "tb_business_unit" ("id");

ALTER TABLE "tb_application_role" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_application_role" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_tb_application_role" ADD FOREIGN KEY ("user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_tb_application_role" ADD FOREIGN KEY ("application_role_id") REFERENCES "tb_application_role" ("id");

ALTER TABLE "tb_user_tb_application_role" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_user_tb_application_role" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_permission" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_permission" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_application_role_tb_permission" ADD FOREIGN KEY ("application_role_id") REFERENCES "tb_application_role" ("id");

ALTER TABLE "tb_application_role_tb_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "tb_permission" ("id");

ALTER TABLE "tb_application_role_tb_permission" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_application_role_tb_permission" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_message_format" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_message_format" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_notification" ADD FOREIGN KEY ("from_user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_notification" ADD FOREIGN KEY ("to_user_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_notification" ADD FOREIGN KEY ("created_by_id") REFERENCES "tb_user" ("id");

ALTER TABLE "tb_notification" ADD FOREIGN KEY ("updated_by_id") REFERENCES "tb_user" ("id");
