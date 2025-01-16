CREATE SCHEMA "CARMEN_SYSTEM";

CREATE SCHEMA "TENANT_DUMMY";

CREATE TYPE "CARMEN_SYSTEM"."enum_token_type" AS ENUM (
  'access_token',
  'refresh_token'
);

CREATE TYPE "CARMEN_SYSTEM"."enum_subscription_status" AS ENUM (
  'active',
  'inactive',
  'expired'
);

CREATE TYPE "TENANT_DUMMY"."enum_activity_action" AS ENUM (
  'view',
  'create',
  'update',
  'delete',
  'login',
  'other'
);

CREATE TYPE "TENANT_DUMMY"."enum_activity_entity_type" AS ENUM (
  'user',
  'business_unit',
  'product',
  'location',
  'department',
  'unit',
  'currency',
  'exchange_rate',
  'menu',
  'delivery_point',
  'purchase_request',
  'purchase_request_item',
  'purchase_order',
  'purchase_order_item',
  'inventory_transaction',
  'inventory_adjustment',
  'store_requisition',
  'store_requisition_item',
  'stock_in',
  'stock_out',
  'stock_adjustment',
  'stock_transfer',
  'stock_count',
  'stock_take',
  'stock_take_item',
  'other'
);

CREATE TYPE "TENANT_DUMMY"."enum_location_type" AS ENUM (
  'inventory',
  'direct',
  'consignment'
);

CREATE TYPE "TENANT_DUMMY"."enum_location_status_type" AS ENUM (
  'active',
  'inactive',
  'maintenance'
);

CREATE TYPE "TENANT_DUMMY"."enum_unit_type" AS ENUM (
  'order_unit',
  'inventory_unit',
  'recipe_unit'
);

CREATE TYPE "TENANT_DUMMY"."enum_product_status_type" AS ENUM (
  'active',
  'inactive',
  'discontinued'
);

CREATE TYPE "TENANT_DUMMY"."enum_workflow_type" AS ENUM (
  'purchase_request',
  'purchase_order',
  'store_requisition'
);

CREATE TYPE "TENANT_DUMMY"."enum_purchase_request_doc_status" AS ENUM (
  'draft',
  'work_in_process',
  'complete'
);

CREATE TYPE "TENANT_DUMMY"."enum_purchase_request_workflow_status" AS ENUM (
  'draft',
  'pending',
  'review',
  'accept'
);

CREATE TYPE "TENANT_DUMMY"."enum_purchase_order_doc_status" AS ENUM (
  'open',
  'voided',
  'closed',
  'draft',
  'sent',
  'partial',
  'fully_received',
  'cancelled',
  'deleted'
);

CREATE TYPE "TENANT_DUMMY"."enum_vendor_contact_type" AS ENUM (
  'phone',
  'email'
);

CREATE TYPE "TENANT_DUMMY"."enum_vendor_address_type" AS ENUM (
  'contact_address',
  'mailing_address',
  'register_address'
);

CREATE TYPE "TENANT_DUMMY"."enum_inventory_doc_type" AS ENUM (
  'good_receive_note',
  'credit_note',
  'store_requisition',
  'stock_in',
  'stock_out',
  'stock_take'
);

CREATE TYPE "TENANT_DUMMY"."enum_count_stock_type" AS ENUM (
  'physical',
  'spot'
);

CREATE TYPE "TENANT_DUMMY"."enum_count_stock_status" AS ENUM (
  'draft',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TABLE "CARMEN_SYSTEM"."tb_currency_iso" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "iso_code" varchar(3) UNIQUE NOT NULL,
  "name" varchar(255) NOT NULL,
  "symbol" varchar(10) NOT NULL
);

CREATE TABLE "CARMEN_SYSTEM"."tb_user" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "username" varchar(30) UNIQUE NOT NULL,
  "email" varchar(255) NOT NULL,
  "is_active" bool DEFAULT false,
  "is_consent" bool DEFAULT false,
  "consent" timestamp,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_password" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "hash" text NOT NULL,
  "is_active" bool DEFAULT false,
  "expired_on" date NOT NULL DEFAULT (now() + '90 day'::interval),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_user_login_session" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "token" text UNIQUE NOT NULL,
  "token_type" "CARMEN_SYSTEM"."enum_token_type" NOT NULL DEFAULT 'access_token',
  "user_id" uuid NOT NULL,
  "expired_on" timestamp NOT NULL DEFAULT (now() + '1 day'::interval)
);

CREATE TABLE "CARMEN_SYSTEM"."tb_user_profile" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid,
  "firstname" varchar(100) NOT NULL DEFAULT '',
  "middlename" varchar(100) DEFAULT '',
  "lastname" varchar(100) DEFAULT '',
  "bio" json DEFAULT '{}',
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_cluster" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(30) UNIQUE NOT NULL,
  "name" text UNIQUE NOT NULL,
  "is_active" bool DEFAULT true,
  "info" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_business_unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "cluster_id" uuid NOT NULL,
  "code" varchar(30) NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "is_hq" bool DEFAULT true,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_user_tb_business_unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid,
  "business_unit_id" uuid,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_module" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_business_unit_tb_module" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "business_unit_id" uuid NOT NULL,
  "module_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_subscription" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "cluster_id" uuid NOT NULL,
  "subscription_number" varchar NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "status" "CARMEN_SYSTEM"."enum_subscription_status" NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_subscription_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "subscription_id" uuid NOT NULL,
  "business_unit_id" uuid NOT NULL,
  "module_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_application_role" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "business_unit_id" uuid NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_user_tb_application_role" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "application_role_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_permission" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "group" varchar NOT NULL,
  "name" varchar NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_application_role_tb_permission" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "application_role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_message_format" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "message" text,
  "is_email" bool NOT NULL DEFAULT false,
  "is_sms" bool DEFAULT false,
  "is_in_app" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "CARMEN_SYSTEM"."tb_notification" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "message" text,
  "is_read" bool DEFAULT false,
  "is_sent" bool DEFAULT false,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_activity" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "action" "TENANT_DUMMY"."enum_activity_action",
  "entity_type" "TENANT_DUMMY"."enum_activity_entity_type",
  "entity_id" uuid,
  "actor_id" uuid,
  "meta_data" json,
  "old_data" json,
  "new_data" json,
  "ip_address" text,
  "user_agent" text,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_menu" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "module_id" uuid NOT NULL,
  "name" varchar NOT NULL,
  "url" varchar NOT NULL,
  "description" text,
  "is_visible" bool DEFAULT true,
  "is_active" bool DEFAULT true,
  "is_lock" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_currency" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(3) UNIQUE NOT NULL,
  "name" varchar(100) NOT NULL,
  "symbol" varchar(5),
  "description" text DEFAULT '',
  "is_active" bool DEFAULT true,
  "rate" float DEFAULT 1,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_exchange_rate" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "at_date" timestamp DEFAULT (now()),
  "currency_id" uuid,
  "rate" float DEFAULT 1,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_location" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "location_type" "TENANT_DUMMY"."enum_location_type" NOT NULL,
  "description" text,
  "info" json,
  "is_active" bool DEFAULT true,
  "delivery_point_id" uuid,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_delivery_point" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_unit_conversion" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid,
  "unit_type" "TENANT_DUMMY"."enum_unit_type" NOT NULL,
  "from_unit_id" uuid,
  "from_unit_qty" float DEFAULT 1,
  "to_unit_id" uuid,
  "to_unit_qty" float DEFAULT 1,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_department" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_product" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "primary_unit_id" uuid NOT NULL,
  "product_status_type" "TENANT_DUMMY"."enum_product_status_type" NOT NULL DEFAULT 'active',
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_product_info" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid UNIQUE NOT NULL,
  "product_item_group_id" uuid,
  "price" Float,
  "info" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_product_category" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_product_sub_category" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar NOT NULL DEFAULT '',
  "name" varchar NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "product_category_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_product_item_group" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar NOT NULL DEFAULT '',
  "name" varchar NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "product_subcategory_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_workflow" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "workflow_type" "TENANT_DUMMY"."enum_workflow_type" NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_purchase_request" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "reference_name" varchar UNIQUE NOT NULL,
  "purchase_request_date" date,
  "workflow_id" uuid,
  "workflow_obj" json,
  "workflow_history" json,
  "purchase_request_status" "TENANT_DUMMY"."enum_purchase_request_doc_status" DEFAULT 'draft',
  "requestor_id" uuid,
  "department_id" uuid,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_purchase_request_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "purchase_request_id" uuid,
  "location_id" uuid,
  "product_id" uuid,
  "unit_id" uuid,
  "description" text,
  "requested_qty" float,
  "approved_qty" float,
  "currency_id" uuid,
  "currency_rate" float,
  "price" numeric(15,5),
  "total_price" numeric(15,5),
  "workflow_history" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_purchase_order" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "purchase_order_status" "TENANT_DUMMY"."enum_purchase_order_doc_status" DEFAULT 'open',
  "description" text,
  "order_date" date,
  "history" json,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_purchase_order_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE,
  "description" text,
  "is_active" bool DEFAULT true,
  "purchase_order_id" uuid,
  "purchase_request_detail_id" uuid,
  "history" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_vendor" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_vendor_contact" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "contact_type" "TENANT_DUMMY"."enum_vendor_contact_type" NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "info" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_vendor_address" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "address_type" "TENANT_DUMMY"."enum_vendor_address_type",
  "address" json,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_product_tb_vendor" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid,
  "vendor_id" uuid,
  "vendor_product_name" varchar,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_inventory_transaction" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "inventory_doc_type" "TENANT_DUMMY"."enum_inventory_doc_type" NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_inventory_transaction_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "from_lot_name" uuid,
  "current_lot_name" varchar,
  "qty" decimal,
  "cost" numeric(15,5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_inventory_transaction_closing_balance" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_detail_id" uuid NOT NULL,
  "lot_name" varchar,
  "lot_index" integer NOT NULL DEFAULT 1,
  "qty" decimal,
  "cost" numeric(15,5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_good_receive_note" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "workflow" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_good_receive_note_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "good_receive_note_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_store_requisition" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "workflow" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_store_requisition_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "store_requisition_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_stock_in" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "workflow" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_stock_in_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "stock_in_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_stock_out" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "workflow" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_stock_out_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "stock_in_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_credit_note" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "workflow" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_credit_note_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "credit_note_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "amount" numeric(15,5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_stock_take" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "workflow" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_stock_take_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "stock_take_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_count_stock" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "start_date" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "end_date" timestamp,
  "location_id" uuid NOT NULL,
  "notes" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "TENANT_DUMMY"."tb_count_stock_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "count_stock_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "qty" decimal NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE INDEX "user_username_idx" ON "CARMEN_SYSTEM"."tb_user" ("username");

CREATE INDEX "user_email_idx" ON "CARMEN_SYSTEM"."tb_user" ("email");

CREATE INDEX "password_user_idx" ON "CARMEN_SYSTEM"."tb_password" ("user_id");

CREATE INDEX "userprofile_user_idx" ON "CARMEN_SYSTEM"."tb_user_profile" ("user_id");

CREATE INDEX "userprofile_firstname_lastname_idx" ON "CARMEN_SYSTEM"."tb_user_profile" ("firstname", "lastname");

CREATE UNIQUE INDEX "cluster_code_u" ON "CARMEN_SYSTEM"."tb_cluster" ("code");

CREATE UNIQUE INDEX "cluster_name_u" ON "CARMEN_SYSTEM"."tb_cluster" ("name");

CREATE INDEX "businessunit_cluster_idx" ON "CARMEN_SYSTEM"."tb_business_unit" ("cluster_id");

CREATE INDEX "businessunit_code_idx" ON "CARMEN_SYSTEM"."tb_business_unit" ("code");

CREATE UNIQUE INDEX "businessunit_cluster_code_u" ON "CARMEN_SYSTEM"."tb_business_unit" ("cluster_id", "code");

CREATE UNIQUE INDEX "user_businessunit_user_business_unit_u" ON "CARMEN_SYSTEM"."tb_user_tb_business_unit" ("user_id", "business_unit_id");

CREATE INDEX "module_name_u" ON "CARMEN_SYSTEM"."tb_module" ("name");

CREATE INDEX "businessunit_module_business_unit_module_u" ON "CARMEN_SYSTEM"."tb_business_unit_tb_module" ("business_unit_id", "module_id");

CREATE UNIQUE INDEX "subscription_cluster_subscription_number_u" ON "CARMEN_SYSTEM"."tb_subscription" ("cluster_id", "subscription_number");

CREATE UNIQUE INDEX "subscriptiondetail_subscription_business_unit_module_u" ON "CARMEN_SYSTEM"."tb_subscription_detail" ("subscription_id", "business_unit_id", "module_id");

CREATE INDEX "tb_application_role_name_idx" ON "CARMEN_SYSTEM"."tb_application_role" ("name");

CREATE UNIQUE INDEX "applicationrole_business_unit_name_u" ON "CARMEN_SYSTEM"."tb_application_role" ("business_unit_id", "name");

CREATE UNIQUE INDEX "user_applicationrole_user_application_role_u" ON "CARMEN_SYSTEM"."tb_user_tb_application_role" ("user_id", "application_role_id");

CREATE UNIQUE INDEX "permission_group_name_u" ON "CARMEN_SYSTEM"."tb_permission" ("group", "name");

CREATE UNIQUE INDEX "applicationrole_permission_application_role_permission_u" ON "CARMEN_SYSTEM"."tb_application_role_tb_permission" ("application_role_id", "permission_id");

CREATE INDEX "messageformat_name_u" ON "CARMEN_SYSTEM"."tb_message_format" ("name");

CREATE INDEX "activity_entitytype_entityid_idx" ON "TENANT_DUMMY"."tb_activity" ("entity_type", "entity_id");

CREATE INDEX "menu_name_u" ON "TENANT_DUMMY"."tb_menu" ("name");

CREATE INDEX "currency_code_u" ON "TENANT_DUMMY"."tb_currency" ("code");

CREATE UNIQUE INDEX "exchangerate_at_date_currency_u" ON "TENANT_DUMMY"."tb_exchange_rate" ("at_date", "currency_id");

CREATE INDEX "location_name_u" ON "TENANT_DUMMY"."tb_location" ("name");

CREATE INDEX "deliverypoint_name_u" ON "TENANT_DUMMY"."tb_delivery_point" ("name");

CREATE INDEX "unit_name_u" ON "TENANT_DUMMY"."tb_unit" ("name");

CREATE INDEX "unitconversion_product_unit_type_from_unit_to_unit_u" ON "TENANT_DUMMY"."tb_unit_conversion" ("product_id", "unit_type", "from_unit_id", "to_unit_id");

CREATE INDEX "department_name_u" ON "TENANT_DUMMY"."tb_department" ("name");

CREATE INDEX "product_code_u" ON "TENANT_DUMMY"."tb_product" ("code");

CREATE INDEX "product_name_u" ON "TENANT_DUMMY"."tb_product" ("name");

CREATE INDEX "productinfo_product_u" ON "TENANT_DUMMY"."tb_product_info" ("product_id");

CREATE INDEX "productcategory_code_u" ON "TENANT_DUMMY"."tb_product_category" ("code");

CREATE INDEX "productcategory_name_u" ON "TENANT_DUMMY"."tb_product_category" ("name");

CREATE UNIQUE INDEX "productsubcategory_code_name_product_category_u" ON "TENANT_DUMMY"."tb_product_sub_category" ("code", "name", "product_category_id");

CREATE UNIQUE INDEX "productitemgroup_code_name_product_subcategory_u" ON "TENANT_DUMMY"."tb_product_item_group" ("code", "name", "product_subcategory_id");

CREATE INDEX "workflow_name_u" ON "TENANT_DUMMY"."tb_workflow" ("name");

CREATE INDEX "PR0_reference_name_u" ON "TENANT_DUMMY"."tb_purchase_request" ("reference_name");

CREATE INDEX "PO_name_u" ON "TENANT_DUMMY"."tb_purchase_order" ("name");

CREATE INDEX "PO1_name_u" ON "TENANT_DUMMY"."tb_purchase_order_detail" ("name");

CREATE INDEX "vendor_name_u" ON "TENANT_DUMMY"."tb_vendor" ("name");

CREATE INDEX "vendorcontact_vendor_contact_type_idx" ON "TENANT_DUMMY"."tb_vendor_contact" ("vendor_id", "contact_type");

CREATE INDEX "vendoraddress_vendor_address_type_idx" ON "TENANT_DUMMY"."tb_vendor_address" ("vendor_id", "address_type");

CREATE UNIQUE INDEX "product_vendor_vendor_product_u" ON "TENANT_DUMMY"."tb_product_tb_vendor" ("vendor_id", "product_id");

CREATE INDEX "inventorytransaction_name_idx" ON "TENANT_DUMMY"."tb_inventory_transaction" ("name");

CREATE UNIQUE INDEX "inventorytransactionclosingbalance_lotname_lot_index_u" ON "TENANT_DUMMY"."tb_inventory_transaction_closing_balance" ("lot_name", "lot_index");

CREATE INDEX "creditnote_name_u" ON "TENANT_DUMMY"."tb_credit_note" ("name");

CREATE UNIQUE INDEX "creditnotedetail_credit_note_name_u" ON "TENANT_DUMMY"."tb_credit_note_detail" ("credit_note_id", "name");

ALTER TABLE "CARMEN_SYSTEM"."tb_user" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_password" ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_password" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_login_session" ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_profile" ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_profile" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_profile" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_cluster" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_cluster" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit" ADD FOREIGN KEY ("cluster_id") REFERENCES "CARMEN_SYSTEM"."tb_cluster" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_business_unit" ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_business_unit" ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."tb_business_unit" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_business_unit" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_business_unit" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_module" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_module" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit_tb_module" ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."tb_business_unit" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit_tb_module" ADD FOREIGN KEY ("module_id") REFERENCES "CARMEN_SYSTEM"."tb_module" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit_tb_module" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_business_unit_tb_module" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription" ADD FOREIGN KEY ("cluster_id") REFERENCES "CARMEN_SYSTEM"."tb_cluster" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription_detail" ADD FOREIGN KEY ("subscription_id") REFERENCES "CARMEN_SYSTEM"."tb_subscription" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription_detail" ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."tb_business_unit" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription_detail" ADD FOREIGN KEY ("module_id") REFERENCES "CARMEN_SYSTEM"."tb_module" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription_detail" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_subscription_detail" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role" ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."tb_business_unit" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_application_role" ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_application_role" ADD FOREIGN KEY ("application_role_id") REFERENCES "CARMEN_SYSTEM"."tb_application_role" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_application_role" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_user_tb_application_role" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_permission" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_permission" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role_tb_permission" ADD FOREIGN KEY ("application_role_id") REFERENCES "CARMEN_SYSTEM"."tb_application_role" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role_tb_permission" ADD FOREIGN KEY ("permission_id") REFERENCES "CARMEN_SYSTEM"."tb_permission" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role_tb_permission" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_application_role_tb_permission" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_message_format" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_message_format" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_notification" ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_notification" ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "CARMEN_SYSTEM"."tb_notification" ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."tb_user" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_exchange_rate" ADD FOREIGN KEY ("currency_id") REFERENCES "TENANT_DUMMY"."tb_currency" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_location" ADD FOREIGN KEY ("delivery_point_id") REFERENCES "TENANT_DUMMY"."tb_delivery_point" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_unit_conversion" ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."tb_product" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_unit_conversion" ADD FOREIGN KEY ("from_unit_id") REFERENCES "TENANT_DUMMY"."tb_unit" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_unit_conversion" ADD FOREIGN KEY ("to_unit_id") REFERENCES "TENANT_DUMMY"."tb_unit" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product" ADD FOREIGN KEY ("primary_unit_id") REFERENCES "TENANT_DUMMY"."tb_unit" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product_info" ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."tb_product" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product_info" ADD FOREIGN KEY ("product_item_group_id") REFERENCES "TENANT_DUMMY"."tb_product_item_group" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product_sub_category" ADD FOREIGN KEY ("product_category_id") REFERENCES "TENANT_DUMMY"."tb_product_category" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product_item_group" ADD FOREIGN KEY ("product_subcategory_id") REFERENCES "TENANT_DUMMY"."tb_product_sub_category" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_purchase_request" ADD FOREIGN KEY ("workflow_id") REFERENCES "TENANT_DUMMY"."tb_workflow" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_purchase_request_detail" ADD FOREIGN KEY ("purchase_request_id") REFERENCES "TENANT_DUMMY"."tb_purchase_request" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_purchase_order_detail" ADD FOREIGN KEY ("purchase_order_id") REFERENCES "TENANT_DUMMY"."tb_purchase_order" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_purchase_order_detail" ADD FOREIGN KEY ("purchase_request_detail_id") REFERENCES "TENANT_DUMMY"."tb_purchase_request_detail" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_vendor_contact" ADD FOREIGN KEY ("vendor_id") REFERENCES "TENANT_DUMMY"."tb_vendor" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_vendor_address" ADD FOREIGN KEY ("vendor_id") REFERENCES "TENANT_DUMMY"."tb_vendor" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product_tb_vendor" ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."tb_product" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_product_tb_vendor" ADD FOREIGN KEY ("vendor_id") REFERENCES "TENANT_DUMMY"."tb_vendor" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_inventory_transaction_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_inventory_transaction_closing_balance" ADD FOREIGN KEY ("inventory_transaction_detail_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction_detail" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_good_receive_note" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_good_receive_note_detail" ADD FOREIGN KEY ("good_receive_note_id") REFERENCES "TENANT_DUMMY"."tb_good_receive_note" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_store_requisition" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_store_requisition_detail" ADD FOREIGN KEY ("store_requisition_id") REFERENCES "TENANT_DUMMY"."tb_store_requisition" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_stock_in" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_stock_in_detail" ADD FOREIGN KEY ("stock_in_id") REFERENCES "TENANT_DUMMY"."tb_stock_in" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_stock_out" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_stock_out_detail" ADD FOREIGN KEY ("stock_in_id") REFERENCES "TENANT_DUMMY"."tb_stock_out" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_credit_note" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_credit_note_detail" ADD FOREIGN KEY ("credit_note_id") REFERENCES "TENANT_DUMMY"."tb_credit_note" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_stock_take" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."tb_inventory_transaction" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_stock_take_detail" ADD FOREIGN KEY ("stock_take_id") REFERENCES "TENANT_DUMMY"."tb_stock_take" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_count_stock_detail" ADD FOREIGN KEY ("count_stock_id") REFERENCES "TENANT_DUMMY"."tb_count_stock" ("id");

ALTER TABLE "TENANT_DUMMY"."tb_count_stock_detail" ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."tb_product" ("id");
