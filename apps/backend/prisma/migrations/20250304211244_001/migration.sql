-- CreateEnum
CREATE TYPE "enum_activity_action" AS ENUM ('view', 'create', 'update', 'delete', 'login', 'other');

-- CreateEnum
CREATE TYPE "enum_inventory_doc_type" AS ENUM ('good_receive_note', 'credit_note', 'store_requisition', 'stock_in', 'stock_out', 'stock_take');

-- CreateEnum
CREATE TYPE "enum_location_type" AS ENUM ('inventory', 'direct', 'consignment');

-- CreateEnum
CREATE TYPE "enum_purchase_request_doc_status" AS ENUM ('draft', 'work_in_process', 'complete', 'complete_purchase_order');

-- CreateEnum
CREATE TYPE "enum_purchase_request_workflow_status" AS ENUM ('draft', 'pending', 'review', 'accept');

-- CreateEnum
CREATE TYPE "enum_unit_type" AS ENUM ('order_unit', 'ingredient_unit');

-- CreateEnum
CREATE TYPE "enum_activity_entity_type" AS ENUM ('user', 'business_unit', 'product', 'location', 'department', 'unit', 'currency', 'exchange_rate', 'menu', 'delivery_point', 'purchase_request', 'purchase_request_item', 'purchase_order', 'purchase_order_item', 'inventory_transaction', 'inventory_adjustment', 'store_requisition', 'store_requisition_item', 'stock_in', 'stock_out', 'stock_adjustment', 'stock_transfer', 'stock_count', 'stock_take', 'stock_take_item', 'other');

-- CreateEnum
CREATE TYPE "enum_purchase_order_doc_status" AS ENUM ('open', 'voided', 'closed', 'draft', 'sent', 'partial', 'fully_received', 'cancelled', 'deleted');

-- CreateEnum
CREATE TYPE "enum_vendor_address_type" AS ENUM ('contact_address', 'mailing_address', 'register_address');

-- CreateEnum
CREATE TYPE "enum_vendor_contact_type" AS ENUM ('phone', 'email');

-- CreateEnum
CREATE TYPE "enum_workflow_type" AS ENUM ('purchase_request', 'purchase_order', 'store_requisition');

-- CreateEnum
CREATE TYPE "enum_count_stock_status" AS ENUM ('draft', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "enum_count_stock_type" AS ENUM ('physical', 'spot');

-- CreateEnum
CREATE TYPE "enum_location_status_type" AS ENUM ('active', 'inactive', 'maintenance');

-- CreateEnum
CREATE TYPE "enum_product_status_type" AS ENUM ('active', 'inactive', 'discontinued');

-- CreateEnum
CREATE TYPE "enum_jv_status" AS ENUM ('draft', 'posted');

-- CreateEnum
CREATE TYPE "enum_tax_type" AS ENUM ('none', 'vat');

-- CreateEnum
CREATE TYPE "enum_comment_type" AS ENUM ('user', 'system');

-- CreateEnum
CREATE TYPE "enum_doc_status" AS ENUM ('draft', 'complete', 'void');

-- CreateTable
CREATE TABLE "tb_activity" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "action" "enum_activity_action",
    "entity_type" "enum_activity_entity_type",
    "entity_id" UUID,
    "actor_id" UUID,
    "meta_data" JSON,
    "old_data" JSON,
    "new_data" JSON,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "tb_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_credit_note" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "ref_no" VARCHAR,
    "doc_status" "enum_doc_status" NOT NULL DEFAULT 'draft',
    "workflow" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_credit_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_credit_note_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID,
    "credit_note_id" UUID NOT NULL,
    "name" VARCHAR,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "qty" DECIMAL(20,5),
    "amount" DECIMAL(20,5),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_credit_note_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_currency" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "symbol" VARCHAR(5),
    "description" TEXT DEFAULT '',
    "is_active" BOOLEAN DEFAULT true,
    "exchange_rate" DECIMAL(15,5) DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_delivery_point" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_delivery_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_department" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_exchange_rate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "at_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "currency_id" UUID,
    "exchange_rate" DECIMAL(15,5) DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_exchange_rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_good_receive_note" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "ref_no" VARCHAR,
    "doc_status" "enum_doc_status" NOT NULL DEFAULT 'draft',
    "workflow" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_good_receive_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_good_receive_note_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID,
    "good_receive_note_id" UUID NOT NULL,
    "purchase_order_detail_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "received_qty" DECIMAL(20,5),
    "received_unit_id" UUID NOT NULL,
    "received_unit_name" VARCHAR,
    "is_foc" BOOLEAN DEFAULT false,
    "price" DECIMAL(20,5),
    "tax_amount" DECIMAL(20,5),
    "total_amount" DECIMAL(20,5),
    "delivery_point_id" UUID,
    "base_price" DECIMAL(20,5),
    "base_qty" DECIMAL(20,5),
    "extra_cost" DECIMAL(20,5),
    "total_cost" DECIMAL(20,5),
    "is_discount" BOOLEAN DEFAULT false,
    "discount_amount" DECIMAL(20,5),
    "is_tax_adjustment" BOOLEAN DEFAULT false,
    "lot_number" VARCHAR,
    "expired_date" TIMESTAMPTZ(6),
    "info" JSON,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_good_receive_note_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_inventory_transaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_doc_type" "enum_inventory_doc_type" NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_inventory_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_inventory_transaction_closing_balance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_detail_id" UUID NOT NULL,
    "lot_name" VARCHAR,
    "lot_index" INTEGER NOT NULL DEFAULT 1,
    "qty" DECIMAL(20,5),
    "cost" DECIMAL(20,5),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_inventory_transaction_closing_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_inventory_transaction_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "from_lot_name" VARCHAR,
    "current_lot_name" VARCHAR,
    "qty" DECIMAL(20,5),
    "unit_cost" DECIMAL(20,5),
    "total_cost" DECIMAL(20,5),
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_inventory_transaction_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "location_type" "enum_location_type" NOT NULL,
    "description" TEXT,
    "info" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "delivery_point_id" UUID,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_menu" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "module_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "description" TEXT,
    "is_visible" BOOLEAN DEFAULT true,
    "is_active" BOOLEAN DEFAULT true,
    "is_lock" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "local_name" VARCHAR,
    "description" TEXT,
    "inventory_unit_id" UUID NOT NULL,
    "inventory_unit_name" VARCHAR NOT NULL DEFAULT '',
    "product_status_type" "enum_product_status_type" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "product_item_group_id" UUID,
    "is_ingredients" BOOLEAN DEFAULT false,
    "price" DECIMAL(20,5),
    "tax_type" "enum_tax_type" DEFAULT 'vat',
    "tax_rate" DECIMAL(15,5) DEFAULT 0,
    "price_deviation_limit" DECIMAL(20,5) DEFAULT 0,
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_item_group" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL DEFAULT '',
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "product_subcategory_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_item_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_sub_category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL DEFAULT '',
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "product_category_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_tb_vendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "vendor_id" UUID,
    "vendor_product_name" VARCHAR,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_tb_vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "purchase_order_status" "enum_purchase_order_doc_status" DEFAULT 'open',
    "description" TEXT,
    "order_date" TIMESTAMPTZ(6),
    "delivery_date" TIMESTAMPTZ(6),
    "vendor_id" UUID,
    "vendor_name" VARCHAR,
    "currency_id" UUID,
    "currency_name" VARCHAR,
    "base_currency_id" UUID,
    "base_currency_name" VARCHAR,
    "exchange_rate" DECIMAL(15,5),
    "notes" TEXT,
    "approval_date" TIMESTAMPTZ(6),
    "email" VARCHAR,
    "buyer_name" VARCHAR,
    "credit_term" VARCHAR,
    "remarks" TEXT,
    "info" JSON,
    "history" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "doc_version" DECIMAL NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_order_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "purchase_order_id" UUID,
    "purchase_request_detail_id" UUID,
    "exchange_rate" DECIMAL(15,5),
    "order_qty" DECIMAL(20,5),
    "order_unit_id" UUID,
    "order_unit_name" VARCHAR,
    "base_qty" DECIMAL(20,5),
    "base_unit_id" UUID,
    "base_unit_name" VARCHAR,
    "unit_price" DECIMAL(20,5),
    "sub_total_price" DECIMAL(20,5),
    "base_sub_total_price" DECIMAL(20,5),
    "is_foc" BOOLEAN DEFAULT false,
    "is_tax_included" BOOLEAN DEFAULT false,
    "tax_rate" DECIMAL(15,5) DEFAULT 0,
    "tax_amount" DECIMAL(20,5) DEFAULT 0,
    "discount_rate" DECIMAL(15,5) DEFAULT 0,
    "discount_amount" DECIMAL(20,5) DEFAULT 0,
    "net_amount" DECIMAL(20,5) DEFAULT 0,
    "base_net_amount" DECIMAL(20,5) DEFAULT 0,
    "total_price" DECIMAL(20,5),
    "base_total_price" DECIMAL(20,5),
    "info" JSON,
    "history" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_order_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reference_name" VARCHAR NOT NULL,
    "purchase_request_date" TIMESTAMPTZ(6),
    "workflow_id" UUID,
    "workflow_obj" JSON,
    "workflow_history" JSON,
    "current_workflow_status" VARCHAR,
    "purchase_request_status" "enum_purchase_request_doc_status" DEFAULT 'draft',
    "requestor_id" UUID,
    "department_id" UUID,
    "job_code" VARCHAR,
    "budget_code" VARCHAR,
    "allocated_budget_amount" DECIMAL(20,5),
    "is_active" BOOLEAN DEFAULT true,
    "doc_version" DECIMAL NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_request_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "purchase_request_id" UUID,
    "location_id" UUID,
    "location_name" VARCHAR,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "unit_id" UUID,
    "unit_name" VARCHAR,
    "vendor_id" UUID,
    "vendor_name" VARCHAR,
    "price_list_id" UUID,
    "description" TEXT,
    "requested_qty" DECIMAL(20,5),
    "approved_qty" DECIMAL(20,5),
    "currency_id" UUID,
    "exchange_rate" DECIMAL(15,5),
    "exchange_rate_date" TIMESTAMPTZ(6),
    "price" DECIMAL(20,5),
    "total_price" DECIMAL(20,5),
    "foc" DECIMAL(20,5),
    "is_tax_included" BOOLEAN,
    "is_tax_adjustment" BOOLEAN,
    "is_discount" BOOLEAN,
    "discount_rate" DECIMAL(15,5),
    "discount_amount" DECIMAL(20,5),
    "tax_rate" DECIMAL(15,5),
    "tax_amount" DECIMAL(20,5),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_request_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_in" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "ref_no" VARCHAR,
    "doc_status" "enum_doc_status" NOT NULL DEFAULT 'draft',
    "workflow" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_in_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID,
    "stock_in_id" UUID NOT NULL,
    "name" VARCHAR,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "qty" DECIMAL(20,5),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_in_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_out" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "ref_no" VARCHAR,
    "doc_status" "enum_doc_status" NOT NULL DEFAULT 'draft',
    "workflow" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_out_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_out_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID,
    "stock_out_id" UUID NOT NULL,
    "name" VARCHAR,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "qty" DECIMAL(20,5),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_out_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_take" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "ref_no" VARCHAR,
    "doc_status" "enum_doc_status" NOT NULL DEFAULT 'draft',
    "workflow" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_take_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_take_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID,
    "stock_take_id" UUID NOT NULL,
    "name" VARCHAR,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "qty" DECIMAL(20,5),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_take_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_store_requisition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "ref_no" VARCHAR,
    "doc_status" "enum_doc_status" NOT NULL DEFAULT 'draft',
    "workflow" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_store_requisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_store_requisition_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID,
    "store_requisition_id" UUID NOT NULL,
    "name" VARCHAR,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "qty" DECIMAL(20,5),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_store_requisition_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_unit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_unit_conversion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID,
    "unit_type" "enum_unit_type" NOT NULL,
    "from_unit_id" UUID,
    "from_unit_name" VARCHAR NOT NULL,
    "from_unit_qty" DECIMAL(20,5) DEFAULT 1,
    "to_unit_id" UUID,
    "to_unit_name" VARCHAR NOT NULL,
    "to_unit_qty" DECIMAL(20,5) DEFAULT 1,
    "is_default" BOOLEAN DEFAULT false,
    "description" JSON DEFAULT '{}',
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_unit_conversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_vendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "info" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_vendor_address" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendor_id" UUID,
    "address_type" "enum_vendor_address_type",
    "address" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_vendor_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_vendor_contact" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendor_id" UUID,
    "contact_type" "enum_vendor_contact_type" NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_vendor_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_workflow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "workflow_type" "enum_workflow_type" NOT NULL,
    "description" TEXT,
    "data" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_count_stock" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "start_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMPTZ(6),
    "location_id" UUID NOT NULL,
    "notes" TEXT,
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_count_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_count_stock_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "count_stock_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "qty" DECIMAL(20,5) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_count_stock_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_jv_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "jv_header_id" UUID NOT NULL,
    "account_department_id" UUID NOT NULL,
    "account_name" VARCHAR NOT NULL,
    "currency_id" UUID NOT NULL,
    "exchange_rate" DECIMAL(15,5) NOT NULL,
    "debit" DECIMAL(20,5) NOT NULL DEFAULT 0,
    "credit" DECIMAL(20,5) NOT NULL DEFAULT 0,
    "base_currency_id" UUID NOT NULL,
    "base_debit" DECIMAL(20,5) NOT NULL DEFAULT 0,
    "base_credit" DECIMAL(20,5) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_jv_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_jv_header" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "currency_id" UUID NOT NULL,
    "exchange_rate" DECIMAL(15,5) NOT NULL,
    "base_currency_id" UUID NOT NULL,
    "jv_type" VARCHAR(255) NOT NULL,
    "jv_number" VARCHAR(255) NOT NULL,
    "jv_date" TIMESTAMPTZ(6) NOT NULL,
    "jv_description" TEXT,
    "jv_status" "enum_jv_status" NOT NULL,
    "workflow" JSON,
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_jv_header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_price_list" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendor_id" UUID,
    "from_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" UUID NOT NULL,
    "product_name" VARCHAR,
    "price" DECIMAL(20,5) NOT NULL,
    "unit_id" UUID,
    "unit_name" VARCHAR,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_price_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "tb_product_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_department_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "department_id" UUID NOT NULL,
    "is_hod" BOOLEAN DEFAULT false,

    CONSTRAINT "tb_department_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_attachment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "filename" VARCHAR(255),
    "filetype" VARCHAR(255),
    "data" BYTEA,
    "info" JSON,

    CONSTRAINT "tb_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_currency_comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "enum_comment_type",
    "user_id" UUID,
    "message" TEXT,
    "attachments" JSON DEFAULT '{}',
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_currency_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_unit_comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "enum_comment_type",
    "user_id" UUID,
    "message" TEXT,
    "attachments" JSON DEFAULT '{}',
    "info" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_unit_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user_location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "tb_user_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_config_running_code" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" VARCHAR(255),
    "config" JSON DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_config_running_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activity_entitytype_entityid_idx" ON "tb_activity"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "creditnote_name_u" ON "tb_credit_note"("name");

-- CreateIndex
CREATE UNIQUE INDEX "creditnotedetail_credit_note_name_u" ON "tb_credit_note_detail"("credit_note_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_currency_code_key" ON "tb_currency"("code");

-- CreateIndex
CREATE INDEX "currency_code_u" ON "tb_currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_delivery_point_name_key" ON "tb_delivery_point"("name");

-- CreateIndex
CREATE INDEX "deliverypoint_name_u" ON "tb_delivery_point"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_department_name_key" ON "tb_department"("name");

-- CreateIndex
CREATE INDEX "department_name_u" ON "tb_department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exchangerate_at_date_currency_u" ON "tb_exchange_rate"("at_date", "currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "inventorytransactionclosingbalance_lotname_lot_index_u" ON "tb_inventory_transaction_closing_balance"("lot_name", "lot_index");

-- CreateIndex
CREATE UNIQUE INDEX "tb_location_name_key" ON "tb_location"("name");

-- CreateIndex
CREATE INDEX "location_name_u" ON "tb_location"("name");

-- CreateIndex
CREATE INDEX "menu_name_u" ON "tb_menu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_code_key" ON "tb_product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_name_key" ON "tb_product"("name");

-- CreateIndex
CREATE INDEX "product_code_u" ON "tb_product"("code");

-- CreateIndex
CREATE INDEX "product_name_u" ON "tb_product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_category_code_key" ON "tb_product_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_category_name_key" ON "tb_product_category"("name");

-- CreateIndex
CREATE INDEX "productcategory_code_u" ON "tb_product_category"("code");

-- CreateIndex
CREATE INDEX "productcategory_name_u" ON "tb_product_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_info_product_id_key" ON "tb_product_info"("product_id");

-- CreateIndex
CREATE INDEX "productinfo_product_u" ON "tb_product_info"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "productitemgroup_code_name_product_subcategory_u" ON "tb_product_item_group"("code", "name", "product_subcategory_id");

-- CreateIndex
CREATE UNIQUE INDEX "productsubcategory_code_name_product_category_u" ON "tb_product_sub_category"("code", "name", "product_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_vendor_vendor_product_u" ON "tb_product_tb_vendor"("vendor_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_purchase_order_name_key" ON "tb_purchase_order"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_purchase_order_detail_name_key" ON "tb_purchase_order_detail"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_purchase_request_reference_name_key" ON "tb_purchase_request"("reference_name");

-- CreateIndex
CREATE INDEX "PR0_reference_name_u" ON "tb_purchase_request"("reference_name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_unit_name_key" ON "tb_unit"("name");

-- CreateIndex
CREATE INDEX "unit_name_u" ON "tb_unit"("name");

-- CreateIndex
CREATE INDEX "unitconversion_product_unit_type_from_unit_to_unit_u" ON "tb_unit_conversion"("product_id", "unit_type", "from_unit_id", "to_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_vendor_name_key" ON "tb_vendor"("name");

-- CreateIndex
CREATE INDEX "vendor_name_u" ON "tb_vendor"("name");

-- CreateIndex
CREATE INDEX "vendoraddress_vendor_address_type_idx" ON "tb_vendor_address"("vendor_id", "address_type");

-- CreateIndex
CREATE INDEX "vendorcontact_vendor_contact_type_idx" ON "tb_vendor_contact"("vendor_id", "contact_type");

-- CreateIndex
CREATE UNIQUE INDEX "tb_workflow_name_key" ON "tb_workflow"("name");

-- CreateIndex
CREATE INDEX "workflow_name_u" ON "tb_workflow"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_location_u" ON "tb_product_location"("product_id", "location_id");

-- CreateIndex
CREATE UNIQUE INDEX "department_user_u" ON "tb_department_user"("department_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_location_u" ON "tb_user_location"("user_id", "location_id");

-- AddForeignKey
ALTER TABLE "tb_credit_note_detail" ADD CONSTRAINT "tb_credit_note_detail_credit_note_id_fkey" FOREIGN KEY ("credit_note_id") REFERENCES "tb_credit_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_credit_note_detail" ADD CONSTRAINT "tb_credit_note_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_credit_note_detail" ADD CONSTRAINT "tb_credit_note_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_exchange_rate" ADD CONSTRAINT "tb_exchange_rate_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_delivery_point_id_fkey" FOREIGN KEY ("delivery_point_id") REFERENCES "tb_delivery_point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_good_receive_note_id_fkey" FOREIGN KEY ("good_receive_note_id") REFERENCES "tb_good_receive_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "tb_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_purchase_order_detail_id_fkey" FOREIGN KEY ("purchase_order_detail_id") REFERENCES "tb_purchase_order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_received_unit_id_fkey" FOREIGN KEY ("received_unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_inventory_transaction_closing_balance" ADD CONSTRAINT "tb_inventory_transaction_clos_inventory_transaction_detail_fkey" FOREIGN KEY ("inventory_transaction_detail_id") REFERENCES "tb_inventory_transaction_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_inventory_transaction_detail" ADD CONSTRAINT "tb_inventory_transaction_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_location" ADD CONSTRAINT "tb_location_delivery_point_id_fkey" FOREIGN KEY ("delivery_point_id") REFERENCES "tb_delivery_point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_inventory_unit_id_fkey" FOREIGN KEY ("inventory_unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_info" ADD CONSTRAINT "tb_product_info_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_info" ADD CONSTRAINT "tb_product_info_product_item_group_id_fkey" FOREIGN KEY ("product_item_group_id") REFERENCES "tb_product_item_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_item_group" ADD CONSTRAINT "tb_product_item_group_product_subcategory_id_fkey" FOREIGN KEY ("product_subcategory_id") REFERENCES "tb_product_sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_sub_category" ADD CONSTRAINT "tb_product_sub_category_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "tb_product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_tb_vendor" ADD CONSTRAINT "tb_product_tb_vendor_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_tb_vendor" ADD CONSTRAINT "tb_product_tb_vendor_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order" ADD CONSTRAINT "tb_purchase_order_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order" ADD CONSTRAINT "tb_purchase_order_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order" ADD CONSTRAINT "tb_purchase_order_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order_detail" ADD CONSTRAINT "tb_purchase_order_detail_base_unit_id_fkey" FOREIGN KEY ("base_unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order_detail" ADD CONSTRAINT "tb_purchase_order_detail_order_unit_id_fkey" FOREIGN KEY ("order_unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order_detail" ADD CONSTRAINT "tb_purchase_order_detail_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "tb_purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order_detail" ADD CONSTRAINT "tb_purchase_order_detail_purchase_request_detail_id_fkey" FOREIGN KEY ("purchase_request_detail_id") REFERENCES "tb_purchase_request_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request" ADD CONSTRAINT "tb_purchase_request_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "tb_workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "tb_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_price_list_id_fkey" FOREIGN KEY ("price_list_id") REFERENCES "tb_price_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_purchase_request_id_fkey" FOREIGN KEY ("purchase_request_id") REFERENCES "tb_purchase_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_in_detail" ADD CONSTRAINT "tb_stock_in_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_in_detail" ADD CONSTRAINT "tb_stock_in_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_in_detail" ADD CONSTRAINT "tb_stock_in_detail_stock_in_id_fkey" FOREIGN KEY ("stock_in_id") REFERENCES "tb_stock_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_out_detail" ADD CONSTRAINT "tb_stock_out_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_out_detail" ADD CONSTRAINT "tb_stock_out_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_out_detail" ADD CONSTRAINT "tb_stock_out_detail_stock_out_id_fkey" FOREIGN KEY ("stock_out_id") REFERENCES "tb_stock_out"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_take_detail" ADD CONSTRAINT "tb_stock_take_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_take_detail" ADD CONSTRAINT "tb_stock_take_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_take_detail" ADD CONSTRAINT "tb_stock_take_detail_stock_take_id_fkey" FOREIGN KEY ("stock_take_id") REFERENCES "tb_stock_take"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_store_requisition_detail" ADD CONSTRAINT "tb_store_requisition_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_store_requisition_detail" ADD CONSTRAINT "tb_store_requisition_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_store_requisition_detail" ADD CONSTRAINT "tb_store_requisition_detail_store_requisition_id_fkey" FOREIGN KEY ("store_requisition_id") REFERENCES "tb_store_requisition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_unit_conversion" ADD CONSTRAINT "tb_unit_conversion_from_unit_id_fkey" FOREIGN KEY ("from_unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_unit_conversion" ADD CONSTRAINT "tb_unit_conversion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_unit_conversion" ADD CONSTRAINT "tb_unit_conversion_to_unit_id_fkey" FOREIGN KEY ("to_unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_vendor_address" ADD CONSTRAINT "tb_vendor_address_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_vendor_contact" ADD CONSTRAINT "tb_vendor_contact_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_count_stock_detail" ADD CONSTRAINT "tb_count_stock_detail_count_stock_id_fkey" FOREIGN KEY ("count_stock_id") REFERENCES "tb_count_stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_count_stock_detail" ADD CONSTRAINT "tb_count_stock_detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_jv_detail" ADD CONSTRAINT "tb_jv_detail_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_jv_detail" ADD CONSTRAINT "tb_jv_detail_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_jv_detail" ADD CONSTRAINT "tb_jv_detail_jv_header_id_fkey" FOREIGN KEY ("jv_header_id") REFERENCES "tb_jv_header"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_jv_header" ADD CONSTRAINT "tb_jv_header_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_jv_header" ADD CONSTRAINT "tb_jv_header_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_price_list" ADD CONSTRAINT "tb_price_list_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_price_list" ADD CONSTRAINT "tb_price_list_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_price_list" ADD CONSTRAINT "tb_price_list_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_location" ADD CONSTRAINT "tb_product_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "tb_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_location" ADD CONSTRAINT "tb_product_location_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_department_user" ADD CONSTRAINT "tb_department_user_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "tb_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user_location" ADD CONSTRAINT "tb_user_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "tb_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
