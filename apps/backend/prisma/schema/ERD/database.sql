CREATE SCHEMA "CARMEN_SYSTEM";
CREATE SCHEMA "TENANT_DUMMY";
CREATE TYPE "CARMEN_SYSTEM"."enum_subscription_status" AS ENUM ('active', 'inactive', 'expired');
CREATE TYPE "CARMEN_SYSTEM"."enum_permission_action" AS ENUM (
  'read',
  'read_all',
  'create',
  'update',
  'delete',
  'own_delete',
  'print',
  'export'
);
CREATE TYPE "TENANT_DUMMY"."enum_activity_action" AS ENUM (
  'read',
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
CREATE TYPE "TENANT_DUMMY"."enum_location_type" AS ENUM ('inventory', 'direct', 'consignment');
CREATE TYPE "TENANT_DUMMY"."enum_unit_type" AS ENUM (
  'order_unit',
  'inventory_unit',
  'recipe_unit'
);
CREATE TYPE "TENANT_DUMMY"."enum_purchase_request_doc_status" AS ENUM ('draft', 'work_in_process', 'complete');
CREATE TYPE "TENANT_DUMMY"."enum_purchase_request_workflow_status" AS ENUM ('draft', 'pending', 'review', 'accept');
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
CREATE TYPE "TENANT_DUMMY"."enum_inventory_doc_type" AS ENUM (
  'good_receive_note',
  'credit_note',
  'store_requisition',
  'issue',
  'adjust',
  'stock_in',
  'stock_out'
);
CREATE TABLE "CARMEN_SYSTEM"."user_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."password_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "hash" text NOT NULL,
  "is_active" bool DEFAULT false,
  "expiredOn" date NOT NULL DEFAULT (now() + '90 day'::interval),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."user_profile_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."module_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."business_unit_module_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "business_unit_id" uuid NOT NULL,
  "module_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."subscription_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."subscription_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "subscription_id" uuid NOT NULL,
  "business_unit_id" uuid NOT NULL,
  "module_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."cluster_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."business_unit_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."user_business_unit_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid,
  "business_unit_id" uuid,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."notification_preference_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid UNIQUE NOT NULL,
  "is_email" bool NOT NULL DEFAULT false,
  "is_sms" bool DEFAULT false,
  "is_in_app" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."notification_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."role_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "business_unit_id" uuid NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."permission_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "group" varchar NOT NULL,
  "name" varchar NOT NULL,
  "action" "CARMEN_SYSTEM"."enum_permission_action" NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."user_role_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "role_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."role_permission_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "role_id" uuid NOT NULL,
  "permission_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."global_activity_table" (
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
CREATE TABLE "TENANT_DUMMY"."menu_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar(5) UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "is_visible" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."currency_table" (
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
CREATE TABLE "TENANT_DUMMY"."exchange_rate_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "at_date" timestamp DEFAULT (now()),
  "currency_id" uuid,
  "rate" float DEFAULT 1,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."location_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "location_type" "TENANT_DUMMY"."enum_location_type" NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "delivery_point_id" uuid,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."delivery_point_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."unit_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."unit_conversion_table" (
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
CREATE TABLE "TENANT_DUMMY"."department_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "primary_unit" uuid NOT NULL,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_info_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid UNIQUE NOT NULL,
  "price" Float,
  "info" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_category_table" (
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
CREATE TABLE "TENANT_DUMMY"."product_sub_category_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "product_category_id" uuid,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_item_group_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "product_subcategory_id" uuid,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_request_type_table" (
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
CREATE TABLE "TENANT_DUMMY"."purchase_request_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "reference_name" varchar UNIQUE NOT NULL,
  "purchase_request_date" date,
  "purchase_request_type_id" uuid,
  "purchase_request_status" "TENANT_DUMMY"."enum_purchase_request_doc_status" DEFAULT 'draft',
  "requestor_id" uuid,
  "department_id" uuid,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_request_detail_table" (
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
  "price" numeric(15, 5),
  "total_price" numeric(15, 5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_request_detail_workflow_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "purchase_request_detail_id" uuid,
  "purchase_request_workflow_status" "TENANT_DUMMY"."enum_purchase_request_workflow_status" DEFAULT 'draft',
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_order_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "purchase_order_status" "TENANT_DUMMY"."enum_purchase_order_doc_status" DEFAULT 'open',
  "description" text,
  "order_date" date,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_order_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE,
  "description" text,
  "is_active" bool DEFAULT true,
  "purchase_order_id" uuid,
  "purchase_request_detail_id" uuid,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."vendor_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."contact_type_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" uuid UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."vendor_contact_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "contact_type_id" uuid NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "info" json,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."address_type_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" uuid UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."vendor_address_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "address_type_id" uuid NOT NULL,
  "address" json,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_vendor_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid,
  "vendor_id" uuid,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."inventory_transaction_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "inventory_doc_type" "TENANT_DUMMY"."enum_inventory_doc_type" NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."inventory_transaction_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "from_lot_name" uuid,
  "current_lot_name" varchar,
  "qty" decimal,
  "cost" numeric(15, 5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."inventory_transaction_cf_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_detail_id" uuid NOT NULL,
  "lot_name" varchar,
  "lot_index" integer NOT NULL DEFAULT 1,
  "qty" decimal,
  "cost" numeric(15, 5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."good_receive_note_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."good_receive_note_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "good_receive_note_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."store_requisition_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."store_requisition_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "store_requisition_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."stock_in_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."stock_in_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "stock_in_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."stock_out_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."stock_out_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "stock_in_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."inventory_adjustment_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."inventory_adjustment_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_adjustment_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."credit_note_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."credit_note_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "credit_note_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "amount" numeric(15, 5),
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."stock_take_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "name" varchar,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE TABLE "TENANT_DUMMY"."stock_take_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "stock_take_id" uuid NOT NULL,
  "name" varchar,
  "qty" decimal,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);
CREATE INDEX "user_username_idx" ON "CARMEN_SYSTEM"."user_table" ("username");
CREATE INDEX "user_email_idx" ON "CARMEN_SYSTEM"."user_table" ("email");
CREATE INDEX "password_user_id_idx" ON "CARMEN_SYSTEM"."password_table" ("user_id");
CREATE INDEX "userprofile_user_id_idx" ON "CARMEN_SYSTEM"."user_profile_table" ("user_id");
CREATE INDEX "userprofile_firstname_lastname_idx" ON "CARMEN_SYSTEM"."user_profile_table" ("firstname", "lastname");
CREATE INDEX "module_name_id_u" ON "CARMEN_SYSTEM"."module_table" ("name");
CREATE INDEX "businessunitmodule_business_unit_id_module_id_u" ON "CARMEN_SYSTEM"."business_unit_module_table" ("business_unit_id", "module_id");
CREATE UNIQUE INDEX "subscription_cluster_id_subscription_number_u" ON "CARMEN_SYSTEM"."subscription_table" ("cluster_id", "subscription_number");
CREATE UNIQUE INDEX "subscriptiondetail_subscription_id_business_unit_id_module_id_u" ON "CARMEN_SYSTEM"."subscription_detail_table" (
  "subscription_id",
  "business_unit_id",
  "module_id"
);
CREATE UNIQUE INDEX "cluster_code_u" ON "CARMEN_SYSTEM"."cluster_table" ("code");
CREATE UNIQUE INDEX "cluster_name_u" ON "CARMEN_SYSTEM"."cluster_table" ("name");
CREATE INDEX "tenant_clusertid_idx" ON "CARMEN_SYSTEM"."business_unit_table" ("cluster_id");
CREATE INDEX "businessunit_code_idx" ON "CARMEN_SYSTEM"."business_unit_table" ("code");
CREATE UNIQUE INDEX "businessunit_clusertid_code_u" ON "CARMEN_SYSTEM"."business_unit_table" ("cluster_id", "code");
CREATE UNIQUE INDEX "usertenant_user_id_business_unit_id_u" ON "CARMEN_SYSTEM"."user_business_unit_table" ("user_id", "business_unit_id");
CREATE INDEX "notificationpreference_user_id_u" ON "CARMEN_SYSTEM"."notification_preference_table" ("user_id");
CREATE INDEX "role_name_idx" ON "CARMEN_SYSTEM"."role_table" ("name");
CREATE UNIQUE INDEX "role_business_unit_id_name_u" ON "CARMEN_SYSTEM"."role_table" ("business_unit_id", "name");
CREATE UNIQUE INDEX "permission_group_name_action_u" ON "CARMEN_SYSTEM"."permission_table" ("group", "name", "action");
CREATE UNIQUE INDEX "userrole_user_id_role_id_u" ON "CARMEN_SYSTEM"."user_role_table" ("user_id", "role_id");
CREATE UNIQUE INDEX "rolepermission_role_id_permission_id_u" ON "CARMEN_SYSTEM"."role_permission_table" ("role_id", "permission_id");
CREATE INDEX "global_activity_entitytype_entityid_idx" ON "TENANT_DUMMY"."global_activity_table" ("entity_type", "entity_id");
CREATE INDEX "menu_name_u" ON "TENANT_DUMMY"."menu_table" ("name");
CREATE INDEX "currency_code_u" ON "TENANT_DUMMY"."currency_table" ("code");
CREATE UNIQUE INDEX "exchangerate_at_date_currency_id_u" ON "TENANT_DUMMY"."exchange_rate_table" ("at_date", "currency_id");
CREATE INDEX "location_name_u" ON "TENANT_DUMMY"."location_table" ("name");
CREATE INDEX "deliverypoint_name_u" ON "TENANT_DUMMY"."delivery_point_table" ("name");
CREATE INDEX "unit_name_u" ON "TENANT_DUMMY"."unit_table" ("name");
CREATE INDEX "unitconversion_product_id_unit_type_from_unit_id_to_unit_id_u" ON "TENANT_DUMMY"."unit_conversion_table" (
  "product_id",
  "unit_type",
  "from_unit_id",
  "to_unit_id"
);
CREATE INDEX "department_name_u" ON "TENANT_DUMMY"."department_table" ("name");
CREATE INDEX "product_code_u" ON "TENANT_DUMMY"."product_table" ("code");
CREATE INDEX "product_name_u" ON "TENANT_DUMMY"."product_table" ("name");
CREATE INDEX "productinfo_product_id_u" ON "TENANT_DUMMY"."product_info_table" ("product_id");
CREATE INDEX "productcategory_code_u" ON "TENANT_DUMMY"."product_category_table" ("code");
CREATE INDEX "productcategory_name_u" ON "TENANT_DUMMY"."product_category_table" ("name");
CREATE INDEX "productsubcategory_code_u" ON "TENANT_DUMMY"."product_sub_category_table" ("code");
CREATE INDEX "productsubcategory_name_u" ON "TENANT_DUMMY"."product_sub_category_table" ("name");
CREATE INDEX "productitemgroup_code_u" ON "TENANT_DUMMY"."product_item_group_table" ("code");
CREATE INDEX "productitemgroup_name_u" ON "TENANT_DUMMY"."product_item_group_table" ("name");
CREATE INDEX "PRtype_code_u" ON "TENANT_DUMMY"."purchase_request_type_table" ("code");
CREATE INDEX "PRtype_name_u" ON "TENANT_DUMMY"."purchase_request_type_table" ("name");
CREATE INDEX "PR0_reference_name_u" ON "TENANT_DUMMY"."purchase_request_table" ("reference_name");
CREATE INDEX "PO_name_u" ON "TENANT_DUMMY"."purchase_order_table" ("name");
CREATE INDEX "PO1_name_u" ON "TENANT_DUMMY"."purchase_order_detail_table" ("name");
CREATE INDEX "vendor_name_u" ON "TENANT_DUMMY"."vendor_table" ("name");
CREATE INDEX "contacttype_name_u" ON "TENANT_DUMMY"."contact_type_table" ("name");
CREATE UNIQUE INDEX "vendorcontact_vendor_id_contact_type_id_u" ON "TENANT_DUMMY"."vendor_contact_table" ("vendor_id", "contact_type_id");
CREATE INDEX "addresstype_name_u" ON "TENANT_DUMMY"."address_type_table" ("name");
CREATE UNIQUE INDEX "vendorcontact_vendor_id_address_type_id_u" ON "TENANT_DUMMY"."vendor_address_table" ("vendor_id", "address_type_id");
CREATE UNIQUE INDEX "productvendor_vendor_id_product_id_u" ON "TENANT_DUMMY"."product_vendor_table" ("vendor_id", "product_id");
CREATE UNIQUE INDEX "inv2_lotname_lot_index_u" ON "TENANT_DUMMY"."inventory_transaction_cf_table" ("lot_name", "lot_index");
CREATE INDEX "inventoryadjustment_name_u" ON "TENANT_DUMMY"."inventory_adjustment_table" ("name");
CREATE UNIQUE INDEX "inventoryadjustmentdetail_inventory_adjustment_id_name_u" ON "TENANT_DUMMY"."inventory_adjustment_detail_table" ("inventory_adjustment_id", "name");
CREATE INDEX "creditnote_name_u" ON "TENANT_DUMMY"."credit_note_table" ("name");
CREATE UNIQUE INDEX "creditnotedetail_credit_note_id_name_u" ON "TENANT_DUMMY"."credit_note_detail_table" ("credit_note_id", "name");
COMMENT ON TABLE "TENANT_DUMMY"."contact_type_table" IS 'contact_type_id is not unique because a vendor can have multiple contacts of the same type
sample:
vendor can have multiple phone numbers, email addresses, etc.
';
COMMENT ON TABLE "TENANT_DUMMY"."address_type_table" IS 'address_type_id is not unique because a vendor can have multiple addresses of the same type
sample:
vendor can have multiple physical addresses, mailing addresses, etc.
';
ALTER TABLE "CARMEN_SYSTEM"."user_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."password_table"
ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."password_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_profile_table"
ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_profile_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_profile_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."module_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."module_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("module_id") REFERENCES "CARMEN_SYSTEM"."module_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_table"
ADD FOREIGN KEY ("cluster_id") REFERENCES "CARMEN_SYSTEM"."cluster_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("subscription_id") REFERENCES "CARMEN_SYSTEM"."subscription_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("module_id") REFERENCES "CARMEN_SYSTEM"."module_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."cluster_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."cluster_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_table"
ADD FOREIGN KEY ("cluster_id") REFERENCES "CARMEN_SYSTEM"."cluster_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_preference_table"
ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_preference_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_preference_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_table"
ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_table"
ADD FOREIGN KEY ("business_unit_id") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."permission_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."permission_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("user_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("role_id") REFERENCES "CARMEN_SYSTEM"."role_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("role_id") REFERENCES "CARMEN_SYSTEM"."role_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("permission_id") REFERENCES "CARMEN_SYSTEM"."permission_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("created_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("updated_by_id") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "TENANT_DUMMY"."exchange_rate_table"
ADD FOREIGN KEY ("currency_id") REFERENCES "TENANT_DUMMY"."currency_table" ("id");
ALTER TABLE "TENANT_DUMMY"."location_table"
ADD FOREIGN KEY ("delivery_point_id") REFERENCES "TENANT_DUMMY"."delivery_point_table" ("id");
ALTER TABLE "TENANT_DUMMY"."unit_conversion_table"
ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."product_table" ("id");
ALTER TABLE "TENANT_DUMMY"."unit_conversion_table"
ADD FOREIGN KEY ("from_unit_id") REFERENCES "TENANT_DUMMY"."unit_table" ("id");
ALTER TABLE "TENANT_DUMMY"."unit_conversion_table"
ADD FOREIGN KEY ("to_unit_id") REFERENCES "TENANT_DUMMY"."unit_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_table"
ADD FOREIGN KEY ("primary_unit") REFERENCES "TENANT_DUMMY"."unit_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_info_table"
ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."product_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_sub_category_table"
ADD FOREIGN KEY ("product_category_id") REFERENCES "TENANT_DUMMY"."product_category_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_item_group_table"
ADD FOREIGN KEY ("product_subcategory_id") REFERENCES "TENANT_DUMMY"."product_sub_category_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_request_table"
ADD FOREIGN KEY ("purchase_request_type_id") REFERENCES "TENANT_DUMMY"."purchase_request_type_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_request_detail_table"
ADD FOREIGN KEY ("purchase_request_id") REFERENCES "TENANT_DUMMY"."purchase_request_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_request_detail_workflow_table"
ADD FOREIGN KEY ("purchase_request_detail_id") REFERENCES "TENANT_DUMMY"."purchase_request_detail_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_order_detail_table"
ADD FOREIGN KEY ("purchase_order_id") REFERENCES "TENANT_DUMMY"."purchase_order_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_order_detail_table"
ADD FOREIGN KEY ("purchase_request_detail_id") REFERENCES "TENANT_DUMMY"."purchase_request_detail_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_contact_table"
ADD FOREIGN KEY ("vendor_id") REFERENCES "TENANT_DUMMY"."vendor_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_contact_table"
ADD FOREIGN KEY ("contact_type_id") REFERENCES "TENANT_DUMMY"."contact_type_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_address_table"
ADD FOREIGN KEY ("vendor_id") REFERENCES "TENANT_DUMMY"."vendor_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_address_table"
ADD FOREIGN KEY ("address_type_id") REFERENCES "TENANT_DUMMY"."address_type_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_vendor_table"
ADD FOREIGN KEY ("product_id") REFERENCES "TENANT_DUMMY"."product_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_vendor_table"
ADD FOREIGN KEY ("vendor_id") REFERENCES "TENANT_DUMMY"."vendor_table" ("id");
ALTER TABLE "TENANT_DUMMY"."inventory_transaction_detail_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."inventory_transaction_cf_table"
ADD FOREIGN KEY ("inventory_transaction_detail_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_detail_table" ("id");
ALTER TABLE "TENANT_DUMMY"."good_receive_note_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."good_receive_note_detail_table"
ADD FOREIGN KEY ("good_receive_note_id") REFERENCES "TENANT_DUMMY"."good_receive_note_table" ("id");
ALTER TABLE "TENANT_DUMMY"."store_requisition_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."store_requisition_detail_table"
ADD FOREIGN KEY ("store_requisition_id") REFERENCES "TENANT_DUMMY"."store_requisition_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_in_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_in_detail_table"
ADD FOREIGN KEY ("stock_in_id") REFERENCES "TENANT_DUMMY"."stock_in_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_out_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_out_detail_table"
ADD FOREIGN KEY ("stock_in_id") REFERENCES "TENANT_DUMMY"."stock_out_table" ("id");
ALTER TABLE "TENANT_DUMMY"."inventory_adjustment_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."inventory_adjustment_detail_table"
ADD FOREIGN KEY ("inventory_adjustment_id") REFERENCES "TENANT_DUMMY"."inventory_adjustment_table" ("id");
ALTER TABLE "TENANT_DUMMY"."credit_note_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."credit_note_detail_table"
ADD FOREIGN KEY ("credit_note_id") REFERENCES "TENANT_DUMMY"."credit_note_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_take_table"
ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "TENANT_DUMMY"."inventory_transaction_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_take_detail_table"
ADD FOREIGN KEY ("stock_take_id") REFERENCES "TENANT_DUMMY"."stock_take_table" ("id");