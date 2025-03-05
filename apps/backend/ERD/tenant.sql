CREATE TYPE "enum_activity_action" AS ENUM (
  'view',
  'create',
  'update',
  'delete',
  'login',
  'other'
);

CREATE TYPE "enum_activity_entity_type" AS ENUM (
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

CREATE TYPE "enum_location_type" AS ENUM (
  'inventory',
  'direct',
  'consignment'
);

CREATE TYPE "enum_location_status_type" AS ENUM (
  'active',
  'inactive',
  'maintenance'
);

CREATE TYPE "enum_unit_type" AS ENUM (
  'order_unit',
  'ingredient_unit'
);

CREATE TYPE "enum_product_status_type" AS ENUM (
  'active',
  'inactive',
  'discontinued'
);

CREATE TYPE "enum_tax_type" AS ENUM (
  'none',
  'vat'
);

CREATE TYPE "enum_workflow_type" AS ENUM (
  'purchase_request',
  'purchase_order',
  'store_requisition'
);

CREATE TYPE "enum_purchase_request_doc_status" AS ENUM (
  'draft',
  'work_in_process',
  'complete',
  'complete_purchase_order'
);

CREATE TYPE "enum_purchase_request_workflow_status" AS ENUM (
  'draft',
  'pending',
  'review',
  'accept'
);

CREATE TYPE "enum_purchase_order_doc_status" AS ENUM (
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

CREATE TYPE "enum_vendor_contact_type" AS ENUM (
  'phone',
  'email'
);

CREATE TYPE "enum_vendor_address_type" AS ENUM (
  'contact_address',
  'mailing_address',
  'register_address'
);

CREATE TYPE "enum_inventory_doc_type" AS ENUM (
  'good_receive_note',
  'credit_note',
  'store_requisition',
  'stock_in',
  'stock_out',
  'stock_take'
);

CREATE TYPE "enum_doc_status" AS ENUM (
  'draft',
  'complete',
  'void'
);

CREATE TYPE "enum_count_stock_type" AS ENUM (
  'physical',
  'spot'
);

CREATE TYPE "enum_count_stock_status" AS ENUM (
  'draft',
  'in_progress',
  'completed',
  'cancelled'
);

CREATE TYPE "enum_jv_status" AS ENUM (
  'draft',
  'posted'
);

CREATE TYPE "enum_comment_type" AS ENUM (
  'user',
  'system'
);

CREATE TABLE "tb_activity" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "action" enum_activity_action,
  "entity_type" enum_activity_entity_type,
  "entity_id" uuid,
  "actor_id" uuid,
  "meta_data" json,
  "old_data" json,
  "new_data" json,
  "ip_address" text,
  "user_agent" text,
  "description" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid
);

CREATE TABLE "tb_menu" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "module_id" uuid NOT NULL,
  "name" varchar NOT NULL,
  "url" varchar NOT NULL,
  "description" text,
  "is_visible" bool DEFAULT true,
  "is_active" bool DEFAULT true,
  "is_lock" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_currency" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(3) UNIQUE NOT NULL,
  "name" varchar(100) NOT NULL,
  "symbol" varchar(5),
  "description" text DEFAULT '',
  "is_active" bool DEFAULT true,
  "exchange_rate" numeric(15,5) DEFAULT 1,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_exchange_rate" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "at_date" timestamptz DEFAULT (now()),
  "currency_id" uuid,
  "exchange_rate" numeric(15,5) DEFAULT 1,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_location" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "location_type" enum_location_type NOT NULL,
  "description" text,
  "info" json,
  "is_active" bool DEFAULT true,
  "delivery_point_id" uuid,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_delivery_point" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_unit_conversion" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid,
  "unit_type" enum_unit_type NOT NULL,
  "from_unit_id" uuid,
  "from_unit_name" varchar NOT NULL,
  "from_unit_qty" numeric(20,5) DEFAULT 1,
  "to_unit_id" uuid,
  "to_unit_name" varchar NOT NULL,
  "to_unit_qty" numeric(20,5) DEFAULT 1,
  "is_default" bool DEFAULT false,
  "description" json DEFAULT '{}',
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_department" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_department_user" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "department_id" uuid NOT NULL,
  "is_hod" bool DEFAULT false
);

CREATE TABLE "tb_user_location" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "user_id" uuid NOT NULL,
  "location_id" uuid NOT NULL
);

CREATE TABLE "tb_product" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "local_name" varchar,
  "description" text,
  "inventory_unit_id" uuid NOT NULL,
  "inventory_unit_name" varchar NOT NULL DEFAULT '',
  "product_status_type" enum_product_status_type NOT NULL DEFAULT 'active',
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_product_info" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid UNIQUE NOT NULL,
  "product_item_group_id" uuid,
  "is_ingredients" bool DEFAULT false,
  "price" numeric(20,5),
  "tax_type" enum_tax_type DEFAULT 'vat',
  "tax_rate" numeric(15,5) DEFAULT 0,
  "price_deviation_limit" numeric(20,5) DEFAULT 0,
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_product_location" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid NOT NULL,
  "location_id" uuid NOT NULL
);

CREATE TABLE "tb_product_category" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_product_sub_category" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar NOT NULL DEFAULT '',
  "name" varchar NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "product_category_id" uuid NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_product_item_group" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar NOT NULL DEFAULT '',
  "name" varchar NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "product_subcategory_id" uuid NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_workflow" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "workflow_type" enum_workflow_type NOT NULL,
  "description" text,
  "data" json,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_purchase_request" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "reference_name" varchar UNIQUE NOT NULL,
  "purchase_request_date" timestamptz,
  "workflow_id" uuid,
  "workflow_obj" json,
  "workflow_history" json,
  "current_workflow_status" varchar,
  "purchase_request_status" enum_purchase_request_doc_status DEFAULT 'draft',
  "requestor_id" uuid,
  "department_id" uuid,
  "job_code" varchar,
  "budget_code" varchar,
  "allocated_budget_amount" numeric(20,5),
  "is_active" bool DEFAULT true,
  "doc_version" numeric NOT NULL DEFAULT 0,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_purchase_request_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "purchase_request_id" uuid,
  "location_id" uuid,
  "location_name" varchar,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "unit_id" uuid,
  "unit_name" varchar,
  "vendor_id" uuid,
  "vendor_name" varchar,
  "price_list_id" uuid,
  "description" text,
  "requested_qty" numeric(20,5),
  "approved_qty" numeric(20,5),
  "currency_id" uuid,
  "exchange_rate" numeric(15,5),
  "exchange_rate_date" timestamptz,
  "price" numeric(20,5),
  "total_price" numeric(20,5),
  "foc" numeric(20,5),
  "is_tax_included" bool,
  "is_tax_adjustment" bool,
  "is_discount" bool,
  "discount_rate" numeric(15,5),
  "discount_amount" numeric(20,5),
  "tax_rate" numeric(15,5),
  "tax_amount" numeric(20,5),
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_purchase_order" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "purchase_order_status" enum_purchase_order_doc_status DEFAULT 'open',
  "description" text,
  "order_date" timestamptz,
  "delivery_date" timestamptz,
  "vendor_id" uuid,
  "vendor_name" varchar,
  "currency_id" uuid,
  "currency_name" varchar,
  "base_currency_id" uuid,
  "base_currency_name" varchar,
  "exchange_rate" numeric(15,5),
  "notes" text,
  "approval_date" timestamptz,
  "email" varchar,
  "buyer_name" varchar,
  "credit_term" varchar,
  "remarks" text,
  "info" json,
  "history" json,
  "is_active" bool DEFAULT true,
  "doc_version" numeric NOT NULL DEFAULT 0,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_purchase_order_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE,
  "description" text,
  "is_active" bool DEFAULT true,
  "purchase_order_id" uuid,
  "purchase_request_detail_id" uuid,
  "exchange_rate" numeric(15,5),
  "order_qty" numeric(20,5),
  "order_unit_id" uuid,
  "order_unit_name" varchar,
  "base_qty" numeric(20,5),
  "base_unit_id" uuid,
  "base_unit_name" varchar,
  "unit_price" numeric(20,5),
  "sub_total_price" numeric(20,5),
  "base_sub_total_price" numeric(20,5),
  "is_foc" bool DEFAULT false,
  "is_tax_included" bool DEFAULT false,
  "tax_rate" numeric(15,5) DEFAULT 0,
  "tax_amount" numeric(20,5) DEFAULT 0,
  "discount_rate" numeric(15,5) DEFAULT 0,
  "discount_amount" numeric(20,5) DEFAULT 0,
  "net_amount" numeric(20,5) DEFAULT 0,
  "base_net_amount" numeric(20,5) DEFAULT 0,
  "total_price" numeric(20,5),
  "base_total_price" numeric(20,5),
  "info" json,
  "history" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_vendor" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "info" json,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_price_list" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "from_date" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "to_date" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "price" numeric(20,5) NOT NULL,
  "unit_id" uuid,
  "unit_name" varchar,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_vendor_contact" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "contact_type" enum_vendor_contact_type NOT NULL,
  "description" text,
  "is_active" bool DEFAULT true,
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_vendor_address" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendor_id" uuid,
  "address_type" enum_vendor_address_type,
  "address" json,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_product_tb_vendor" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "vendor_id" uuid,
  "vendor_product_name" varchar,
  "description" text,
  "is_active" bool DEFAULT true,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_inventory_transaction" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_doc_type" enum_inventory_doc_type NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_inventory_transaction_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid NOT NULL,
  "from_lot_name" varchar,
  "current_lot_name" varchar,
  "qty" numeric(20,5),
  "unit_cost" numeric(20,5),
  "total_cost" numeric(20,5),
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_inventory_transaction_closing_balance" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_detail_id" uuid NOT NULL,
  "lot_name" varchar,
  "lot_index" integer NOT NULL DEFAULT 1,
  "qty" numeric(20,5),
  "cost" numeric(20,5),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_good_receive_note" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar,
  "ref_no" varchar,
  "doc_status" enum_doc_status NOT NULL DEFAULT 'draft',
  "workflow" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_good_receive_note_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid,
  "good_receive_note_id" uuid NOT NULL,
  "purchase_order_detail_id" uuid NOT NULL,
  "location_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "received_qty" numeric(20,5),
  "received_unit_id" uuid NOT NULL,
  "received_unit_name" varchar,
  "is_foc" bool DEFAULT false,
  "price" numeric(20,5),
  "tax_amount" numeric(20,5),
  "total_amount" numeric(20,5),
  "delivery_point_id" uuid,
  "base_price" numeric(20,5),
  "base_qty" numeric(20,5),
  "extra_cost" numeric(20,5),
  "total_cost" numeric(20,5),
  "is_discount" bool DEFAULT false,
  "discount_amount" numeric(20,5),
  "is_tax_adjustment" bool DEFAULT false,
  "lot_number" varchar,
  "expired_date" timestamptz,
  "info" json,
  "comment" text,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_store_requisition" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar,
  "ref_no" varchar,
  "doc_status" enum_doc_status NOT NULL DEFAULT 'draft',
  "workflow" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_store_requisition_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid,
  "store_requisition_id" uuid NOT NULL,
  "name" varchar,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "qty" numeric(20,5),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_stock_in" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar,
  "ref_no" varchar,
  "doc_status" enum_doc_status NOT NULL DEFAULT 'draft',
  "workflow" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_stock_in_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid,
  "stock_in_id" uuid NOT NULL,
  "name" varchar,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "qty" numeric(20,5),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_stock_out" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar,
  "ref_no" varchar,
  "doc_status" enum_doc_status NOT NULL DEFAULT 'draft',
  "workflow" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_stock_out_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid,
  "stock_out_id" uuid NOT NULL,
  "name" varchar,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "qty" numeric(20,5),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_credit_note" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar,
  "ref_no" varchar,
  "doc_status" enum_doc_status NOT NULL DEFAULT 'draft',
  "workflow" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_credit_note_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid,
  "credit_note_id" uuid NOT NULL,
  "name" varchar,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "qty" numeric(20,5),
  "amount" numeric(20,5),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_stock_take" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar,
  "ref_no" varchar,
  "doc_status" enum_doc_status NOT NULL DEFAULT 'draft',
  "workflow" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_stock_take_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inventory_transaction_id" uuid,
  "stock_take_id" uuid NOT NULL,
  "name" varchar,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "qty" numeric(20,5),
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_count_stock" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "start_date" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "end_date" timestamptz,
  "location_id" uuid NOT NULL,
  "notes" text,
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_count_stock_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "count_stock_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "product_name" varchar,
  "qty" numeric(20,5) NOT NULL,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_jv_header" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "currency_id" uuid NOT NULL,
  "exchange_rate" numeric(15,5) NOT NULL,
  "base_currency_id" uuid NOT NULL,
  "jv_type" varchar(255) NOT NULL,
  "jv_number" varchar(255) NOT NULL,
  "jv_date" timestamptz NOT NULL,
  "jv_description" text,
  "jv_status" enum_jv_status NOT NULL,
  "workflow" json,
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_jv_detail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "jv_header_id" uuid NOT NULL,
  "account_department_id" uuid NOT NULL,
  "account_name" varchar NOT NULL,
  "currency_id" uuid NOT NULL,
  "exchange_rate" numeric(15,5) NOT NULL,
  "debit" numeric(20,5) NOT NULL DEFAULT 0,
  "credit" numeric(20,5) NOT NULL DEFAULT 0,
  "base_currency_id" uuid NOT NULL,
  "base_debit" numeric(20,5) NOT NULL DEFAULT 0,
  "base_credit" numeric(20,5) NOT NULL DEFAULT 0,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_attachment" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "filename" varchar(255),
  "filetype" varchar(255),
  "data" bytea,
  "info" json
);

CREATE TABLE "tb_config_running_code" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "type" varchar(255),
  "config" json DEFAULT '{}',
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_currency_comment" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "type" enum_comment_type,
  "user_id" uuid,
  "message" text,
  "attachments" json DEFAULT '{}',
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE TABLE "tb_unit_comment" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "type" enum_comment_type,
  "user_id" uuid,
  "message" text,
  "attachments" json DEFAULT '{}',
  "info" json,
  "created_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "created_by_id" uuid,
  "updated_at" timestamptz DEFAULT (CURRENT_TIMESTAMP),
  "updated_by_id" uuid
);

CREATE INDEX "activity_entitytype_entityid_idx" ON "tb_activity" ("entity_type", "entity_id");

CREATE INDEX "menu_name_u" ON "tb_menu" ("name");

CREATE INDEX "currency_code_u" ON "tb_currency" ("code");

CREATE UNIQUE INDEX "exchangerate_at_date_currency_u" ON "tb_exchange_rate" ("at_date", "currency_id");

CREATE INDEX "location_name_u" ON "tb_location" ("name");

CREATE INDEX "deliverypoint_name_u" ON "tb_delivery_point" ("name");

CREATE INDEX "unit_name_u" ON "tb_unit" ("name");

CREATE INDEX "unitconversion_product_unit_type_from_unit_to_unit_u" ON "tb_unit_conversion" ("product_id", "unit_type", "from_unit_id", "to_unit_id");

CREATE INDEX "department_name_u" ON "tb_department" ("name");

CREATE UNIQUE INDEX "department_user_u" ON "tb_department_user" ("department_id", "user_id");

CREATE UNIQUE INDEX "user_location_u" ON "tb_user_location" ("user_id", "location_id");

CREATE INDEX "product_code_u" ON "tb_product" ("code");

CREATE INDEX "product_name_u" ON "tb_product" ("name");

CREATE INDEX "productinfo_product_u" ON "tb_product_info" ("product_id");

CREATE UNIQUE INDEX "product_location_u" ON "tb_product_location" ("product_id", "location_id");

CREATE INDEX "productcategory_code_u" ON "tb_product_category" ("code");

CREATE INDEX "productcategory_name_u" ON "tb_product_category" ("name");

CREATE UNIQUE INDEX "productsubcategory_code_name_product_category_u" ON "tb_product_sub_category" ("code", "name", "product_category_id");

CREATE UNIQUE INDEX "productitemgroup_code_name_product_subcategory_u" ON "tb_product_item_group" ("code", "name", "product_subcategory_id");

CREATE INDEX "workflow_name_u" ON "tb_workflow" ("name");

CREATE INDEX "PR0_reference_name_u" ON "tb_purchase_request" ("reference_name");

CREATE INDEX "vendor_name_u" ON "tb_vendor" ("name");

CREATE INDEX "vendorcontact_vendor_contact_type_idx" ON "tb_vendor_contact" ("vendor_id", "contact_type");

CREATE INDEX "vendoraddress_vendor_address_type_idx" ON "tb_vendor_address" ("vendor_id", "address_type");

CREATE UNIQUE INDEX "product_vendor_vendor_product_u" ON "tb_product_tb_vendor" ("vendor_id", "product_id");

CREATE UNIQUE INDEX "inventorytransactionclosingbalance_lotname_lot_index_u" ON "tb_inventory_transaction_closing_balance" ("lot_name", "lot_index");

CREATE INDEX "creditnote_name_u" ON "tb_credit_note" ("name");

CREATE UNIQUE INDEX "creditnotedetail_credit_note_name_u" ON "tb_credit_note_detail" ("credit_note_id", "name");

ALTER TABLE "tb_exchange_rate" ADD FOREIGN KEY ("currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_location" ADD FOREIGN KEY ("delivery_point_id") REFERENCES "tb_delivery_point" ("id");

ALTER TABLE "tb_unit_conversion" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_unit_conversion" ADD FOREIGN KEY ("from_unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_unit_conversion" ADD FOREIGN KEY ("to_unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_department_user" ADD FOREIGN KEY ("department_id") REFERENCES "tb_department" ("id");

ALTER TABLE "tb_user_location" ADD FOREIGN KEY ("location_id") REFERENCES "tb_location" ("id");

ALTER TABLE "tb_product" ADD FOREIGN KEY ("inventory_unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_product_info" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_product_info" ADD FOREIGN KEY ("product_item_group_id") REFERENCES "tb_product_item_group" ("id");

ALTER TABLE "tb_product_location" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_product_location" ADD FOREIGN KEY ("location_id") REFERENCES "tb_location" ("id");

ALTER TABLE "tb_product_sub_category" ADD FOREIGN KEY ("product_category_id") REFERENCES "tb_product_category" ("id");

ALTER TABLE "tb_product_item_group" ADD FOREIGN KEY ("product_subcategory_id") REFERENCES "tb_product_sub_category" ("id");

ALTER TABLE "tb_purchase_request" ADD FOREIGN KEY ("workflow_id") REFERENCES "tb_workflow" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("purchase_request_id") REFERENCES "tb_purchase_request" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("location_id") REFERENCES "tb_location" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("price_list_id") REFERENCES "tb_price_list" ("id");

ALTER TABLE "tb_purchase_request_detail" ADD FOREIGN KEY ("currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_purchase_order" ADD FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor" ("id");

ALTER TABLE "tb_purchase_order" ADD FOREIGN KEY ("currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_purchase_order" ADD FOREIGN KEY ("base_currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_purchase_order_detail" ADD FOREIGN KEY ("purchase_order_id") REFERENCES "tb_purchase_order" ("id");

ALTER TABLE "tb_purchase_order_detail" ADD FOREIGN KEY ("purchase_request_detail_id") REFERENCES "tb_purchase_request_detail" ("id");

ALTER TABLE "tb_purchase_order_detail" ADD FOREIGN KEY ("order_unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_purchase_order_detail" ADD FOREIGN KEY ("base_unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_price_list" ADD FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor" ("id");

ALTER TABLE "tb_price_list" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_price_list" ADD FOREIGN KEY ("unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_vendor_contact" ADD FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor" ("id");

ALTER TABLE "tb_vendor_address" ADD FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor" ("id");

ALTER TABLE "tb_product_tb_vendor" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_product_tb_vendor" ADD FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor" ("id");

ALTER TABLE "tb_inventory_transaction_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_inventory_transaction_closing_balance" ADD FOREIGN KEY ("inventory_transaction_detail_id") REFERENCES "tb_inventory_transaction_detail" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("good_receive_note_id") REFERENCES "tb_good_receive_note" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("purchase_order_detail_id") REFERENCES "tb_purchase_order_detail" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("location_id") REFERENCES "tb_location" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("received_unit_id") REFERENCES "tb_unit" ("id");

ALTER TABLE "tb_good_receive_note_detail" ADD FOREIGN KEY ("delivery_point_id") REFERENCES "tb_delivery_point" ("id");

ALTER TABLE "tb_store_requisition_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_store_requisition_detail" ADD FOREIGN KEY ("store_requisition_id") REFERENCES "tb_store_requisition" ("id");

ALTER TABLE "tb_store_requisition_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_stock_in_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_stock_in_detail" ADD FOREIGN KEY ("stock_in_id") REFERENCES "tb_stock_in" ("id");

ALTER TABLE "tb_stock_in_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_stock_out_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_stock_out_detail" ADD FOREIGN KEY ("stock_out_id") REFERENCES "tb_stock_out" ("id");

ALTER TABLE "tb_stock_out_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_credit_note_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_credit_note_detail" ADD FOREIGN KEY ("credit_note_id") REFERENCES "tb_credit_note" ("id");

ALTER TABLE "tb_credit_note_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_stock_take_detail" ADD FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction" ("id");

ALTER TABLE "tb_stock_take_detail" ADD FOREIGN KEY ("stock_take_id") REFERENCES "tb_stock_take" ("id");

ALTER TABLE "tb_stock_take_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_count_stock_detail" ADD FOREIGN KEY ("count_stock_id") REFERENCES "tb_count_stock" ("id");

ALTER TABLE "tb_count_stock_detail" ADD FOREIGN KEY ("product_id") REFERENCES "tb_product" ("id");

ALTER TABLE "tb_jv_header" ADD FOREIGN KEY ("currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_jv_header" ADD FOREIGN KEY ("base_currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_jv_detail" ADD FOREIGN KEY ("jv_header_id") REFERENCES "tb_jv_header" ("id");

ALTER TABLE "tb_jv_detail" ADD FOREIGN KEY ("currency_id") REFERENCES "tb_currency" ("id");

ALTER TABLE "tb_jv_detail" ADD FOREIGN KEY ("base_currency_id") REFERENCES "tb_currency" ("id");
