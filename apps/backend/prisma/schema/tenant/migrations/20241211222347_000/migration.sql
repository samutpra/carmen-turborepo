-- CreateEnum
CREATE TYPE "enum_activity_action" AS ENUM ('read', 'create', 'update', 'delete', 'login', 'other');

-- CreateEnum
CREATE TYPE "enum_inventory_doc_type" AS ENUM ('good_receive_note', 'credit_note', 'store_requisition', 'issue', 'adjust', 'stock_in', 'stock_out');

-- CreateEnum
CREATE TYPE "enum_location_type" AS ENUM ('inventory', 'direct', 'consignment');

-- CreateEnum
CREATE TYPE "enum_purchase_request_doc_status" AS ENUM ('draft', 'work_in_process', 'complete');

-- CreateEnum
CREATE TYPE "enum_purchase_request_workflow_status" AS ENUM ('draft', 'pending', 'review', 'accept');

-- CreateEnum
CREATE TYPE "enum_unit_type" AS ENUM ('order_unit', 'inventory_unit', 'recipe_unit');

-- CreateEnum
CREATE TYPE "enum_activity_entity_type" AS ENUM ('user', 'business_unit', 'product', 'location', 'department', 'unit', 'currency', 'exchange_rate', 'menu', 'delivery_point', 'purchase_request', 'purchase_request_item', 'purchase_order', 'purchase_order_item', 'inventory_transaction', 'inventory_adjustment', 'store_requisition', 'store_requisition_item', 'stock_in', 'stock_out', 'stock_adjustment', 'stock_transfer', 'stock_count', 'stock_take', 'stock_take_item', 'other');

-- CreateEnum
CREATE TYPE "enum_purchase_order_doc_status" AS ENUM ('open', 'voided', 'closed', 'draft', 'sent', 'partial', 'fully_received', 'cancelled', 'deleted');

-- CreateTable
CREATE TABLE "address_type_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "address_type_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_type_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "contact_type_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "symbol" VARCHAR(5),
    "description" TEXT DEFAULT '',
    "is_active" BOOLEAN DEFAULT true,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "currency_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_point_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "delivery_point_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "department_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchange_rate_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "at_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "currency_id" UUID,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "exchange_rate_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_activity_table" (
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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "global_activity_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "location_type" "enum_location_type" NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "delivery_point_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "location_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(5) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "is_visible" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "menu_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "product_category_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_info_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "price" DOUBLE PRECISION,
    "info" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "product_info_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_item_group_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "product_subcategory_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "product_item_group_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sub_category_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "product_category_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "product_sub_category_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "primary_unit" UUID NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "product_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_vendor_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID,
    "vendor_id" UUID,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "product_vendor_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_type_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "purchase_request_type_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_conversion_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID,
    "unit_type" "enum_unit_type" NOT NULL,
    "from_unit_id" UUID,
    "from_unit_qty" DOUBLE PRECISION DEFAULT 1,
    "to_unit_id" UUID,
    "to_unit_qty" DOUBLE PRECISION DEFAULT 1,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "unit_conversion_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "unit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_address_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendor_id" UUID,
    "address_type_id" UUID NOT NULL,
    "address" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "vendor_address_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_contact_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendor_id" UUID,
    "contact_type_id" UUID NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "info" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "vendor_contact_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "vendor_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_note_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "credit_note_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "amount" DECIMAL(15,5),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "credit_note_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_note_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "credit_note_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "good_receive_note_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "good_receive_note_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "good_receive_note_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "good_receive_note_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "good_receive_note_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_adjustment_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_adjustment_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "inventory_adjustment_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_adjustment_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "inventory_adjustment_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_cf_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_detail_id" UUID NOT NULL,
    "lot_name" VARCHAR,
    "lot_index" INTEGER NOT NULL DEFAULT 1,
    "qty" DECIMAL,
    "cost" DECIMAL(15,5),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "inventory_transaction_cf_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "from_lot_name" UUID,
    "current_lot_name" VARCHAR,
    "qty" DECIMAL,
    "cost" DECIMAL(15,5),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "inventory_transaction_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "inventory_doc_type" "enum_inventory_doc_type" NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "inventory_transaction_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "purchase_order_id" UUID,
    "purchase_request_detail_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "purchase_order_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "purchase_order_status" "enum_purchase_order_doc_status" DEFAULT 'open',
    "description" TEXT,
    "order_date" DATE,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "purchase_order_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "purchase_request_id" UUID,
    "location_id" UUID,
    "product_id" UUID,
    "unit_id" UUID,
    "description" TEXT,
    "requested_qty" DOUBLE PRECISION,
    "approved_qty" DOUBLE PRECISION,
    "currency_id" UUID,
    "currency_rate" DOUBLE PRECISION,
    "price" DECIMAL(15,5),
    "total_price" DECIMAL(15,5),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "purchase_request_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_detail_workflow_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "purchase_request_detail_id" UUID,
    "purchase_request_workflow_status" "enum_purchase_request_workflow_status" DEFAULT 'draft',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "purchase_request_detail_workflow_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reference_name" VARCHAR NOT NULL,
    "purchase_request_date" DATE,
    "purchase_request_type_id" UUID,
    "purchase_request_status" "enum_purchase_request_doc_status" DEFAULT 'draft',
    "requestor_id" UUID,
    "department_id" UUID,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "purchase_request_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_in_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stock_in_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "stock_in_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_in_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "stock_in_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_out_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stock_in_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "stock_out_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_out_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "stock_out_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_take_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stock_take_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "stock_take_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_take_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "stock_take_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_requisition_detail_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "store_requisition_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "store_requisition_detail_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_requisition_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "store_requisition_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_type_table_name_key" ON "address_type_table"("name");

-- CreateIndex
CREATE INDEX "addresstype_name_u" ON "address_type_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "contact_type_table_name_key" ON "contact_type_table"("name");

-- CreateIndex
CREATE INDEX "contacttype_name_u" ON "contact_type_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "currency_table_code_key" ON "currency_table"("code");

-- CreateIndex
CREATE INDEX "currency_code_u" ON "currency_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_point_table_name_key" ON "delivery_point_table"("name");

-- CreateIndex
CREATE INDEX "deliverypoint_name_u" ON "delivery_point_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "department_table_name_key" ON "department_table"("name");

-- CreateIndex
CREATE INDEX "department_name_u" ON "department_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exchangerate_at_date_currency_id_u" ON "exchange_rate_table"("at_date", "currency_id");

-- CreateIndex
CREATE INDEX "global_activity_entitytype_entityid_idx" ON "global_activity_table"("entity_type", "entity_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_table_name_key" ON "location_table"("name");

-- CreateIndex
CREATE INDEX "location_name_u" ON "location_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_table_name_key" ON "menu_table"("name");

-- CreateIndex
CREATE INDEX "menu_name_u" ON "menu_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_table_code_key" ON "product_category_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_table_name_key" ON "product_category_table"("name");

-- CreateIndex
CREATE INDEX "productcategory_name_u" ON "product_category_table"("name");

-- CreateIndex
CREATE INDEX "productcategory_code_u" ON "product_category_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_info_table_product_id_key" ON "product_info_table"("product_id");

-- CreateIndex
CREATE INDEX "productinfo_product_id_u" ON "product_info_table"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_item_group_table_code_key" ON "product_item_group_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_item_group_table_name_key" ON "product_item_group_table"("name");

-- CreateIndex
CREATE INDEX "productitemgroup_name_u" ON "product_item_group_table"("name");

-- CreateIndex
CREATE INDEX "productitemgroup_code_u" ON "product_item_group_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_sub_category_table_code_key" ON "product_sub_category_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_sub_category_table_name_key" ON "product_sub_category_table"("name");

-- CreateIndex
CREATE INDEX "productsubcategory_name_u" ON "product_sub_category_table"("name");

-- CreateIndex
CREATE INDEX "productsubcategory_code_u" ON "product_sub_category_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_table_code_key" ON "product_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_table_name_key" ON "product_table"("name");

-- CreateIndex
CREATE INDEX "product_code_u" ON "product_table"("code");

-- CreateIndex
CREATE INDEX "product_name_u" ON "product_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productvendor_vendor_id_product_id_u" ON "product_vendor_table"("vendor_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_request_type_table_code_key" ON "purchase_request_type_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_request_type_table_name_key" ON "purchase_request_type_table"("name");

-- CreateIndex
CREATE INDEX "PRtype_name_u" ON "purchase_request_type_table"("name");

-- CreateIndex
CREATE INDEX "PRtype_code_u" ON "purchase_request_type_table"("code");

-- CreateIndex
CREATE INDEX "unitconversion_product_id_unit_type_from_unit_id_to_unit_id_u" ON "unit_conversion_table"("product_id", "unit_type", "from_unit_id", "to_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_table_name_key" ON "unit_table"("name");

-- CreateIndex
CREATE INDEX "unit_name_u" ON "unit_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vendorcontact_vendor_id_address_type_id_u" ON "vendor_address_table"("vendor_id", "address_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "vendorcontact_vendor_id_contact_type_id_u" ON "vendor_contact_table"("vendor_id", "contact_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_table_name_key" ON "vendor_table"("name");

-- CreateIndex
CREATE INDEX "vendor_name_u" ON "vendor_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "creditnotedetail_credit_note_id_name_u" ON "credit_note_detail_table"("credit_note_id", "name");

-- CreateIndex
CREATE INDEX "creditnote_name_u" ON "credit_note_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inventoryadjustmentdetail_inventory_adjustment_id_name_u" ON "inventory_adjustment_detail_table"("inventory_adjustment_id", "name");

-- CreateIndex
CREATE INDEX "inventoryadjustment_name_u" ON "inventory_adjustment_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inv2_lotname_lot_index_u" ON "inventory_transaction_cf_table"("lot_name", "lot_index");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_transaction_table_name_key" ON "inventory_transaction_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_detail_table_name_key" ON "purchase_order_detail_table"("name");

-- CreateIndex
CREATE INDEX "PO1_name_u" ON "purchase_order_detail_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_table_name_key" ON "purchase_order_table"("name");

-- CreateIndex
CREATE INDEX "PO_name_u" ON "purchase_order_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_request_table_reference_name_key" ON "purchase_request_table"("reference_name");

-- CreateIndex
CREATE INDEX "PR0_reference_name_u" ON "purchase_request_table"("reference_name");

-- AddForeignKey
ALTER TABLE "exchange_rate_table" ADD CONSTRAINT "exchange_rate_table_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_table" ADD CONSTRAINT "location_table_delivery_point_id_fkey" FOREIGN KEY ("delivery_point_id") REFERENCES "delivery_point_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_info_table" ADD CONSTRAINT "product_info_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_item_group_table" ADD CONSTRAINT "product_item_group_table_product_subcategory_id_fkey" FOREIGN KEY ("product_subcategory_id") REFERENCES "product_sub_category_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_sub_category_table" ADD CONSTRAINT "product_sub_category_table_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_table" ADD CONSTRAINT "product_table_primary_unit_fkey" FOREIGN KEY ("primary_unit") REFERENCES "unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_vendor_table" ADD CONSTRAINT "product_vendor_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_vendor_table" ADD CONSTRAINT "product_vendor_table_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_conversion_table" ADD CONSTRAINT "unit_conversion_table_from_unit_id_fkey" FOREIGN KEY ("from_unit_id") REFERENCES "unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_conversion_table" ADD CONSTRAINT "unit_conversion_table_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_conversion_table" ADD CONSTRAINT "unit_conversion_table_to_unit_id_fkey" FOREIGN KEY ("to_unit_id") REFERENCES "unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_address_table" ADD CONSTRAINT "vendor_address_table_address_type_id_fkey" FOREIGN KEY ("address_type_id") REFERENCES "address_type_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_address_table" ADD CONSTRAINT "vendor_address_table_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_contact_table" ADD CONSTRAINT "vendor_contact_table_contact_type_id_fkey" FOREIGN KEY ("contact_type_id") REFERENCES "contact_type_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_contact_table" ADD CONSTRAINT "vendor_contact_table_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit_note_detail_table" ADD CONSTRAINT "credit_note_detail_table_credit_note_id_fkey" FOREIGN KEY ("credit_note_id") REFERENCES "credit_note_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "credit_note_table" ADD CONSTRAINT "credit_note_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "good_receive_note_detail_table" ADD CONSTRAINT "good_receive_note_detail_table_good_receive_note_id_fkey" FOREIGN KEY ("good_receive_note_id") REFERENCES "good_receive_note_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "good_receive_note_table" ADD CONSTRAINT "good_receive_note_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_adjustment_detail_table" ADD CONSTRAINT "inventory_adjustment_detail_table_inventory_adjustment_id_fkey" FOREIGN KEY ("inventory_adjustment_id") REFERENCES "inventory_adjustment_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_adjustment_table" ADD CONSTRAINT "inventory_adjustment_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_transaction_cf_table" ADD CONSTRAINT "inventory_transaction_cf_tabl_inventory_transaction_detail_fkey" FOREIGN KEY ("inventory_transaction_detail_id") REFERENCES "inventory_transaction_detail_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_transaction_detail_table" ADD CONSTRAINT "inventory_transaction_detail_tabl_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_order_detail_table" ADD CONSTRAINT "purchase_order_detail_table_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_order_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_order_detail_table" ADD CONSTRAINT "purchase_order_detail_table_purchase_request_detail_id_fkey" FOREIGN KEY ("purchase_request_detail_id") REFERENCES "purchase_request_detail_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_request_detail_table" ADD CONSTRAINT "purchase_request_detail_table_purchase_request_id_fkey" FOREIGN KEY ("purchase_request_id") REFERENCES "purchase_request_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_request_detail_workflow_table" ADD CONSTRAINT "purchase_request_detail_workflo_purchase_request_detail_id_fkey" FOREIGN KEY ("purchase_request_detail_id") REFERENCES "purchase_request_detail_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_request_table" ADD CONSTRAINT "purchase_request_table_purchase_request_type_id_fkey" FOREIGN KEY ("purchase_request_type_id") REFERENCES "purchase_request_type_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_in_detail_table" ADD CONSTRAINT "stock_in_detail_table_stock_in_id_fkey" FOREIGN KEY ("stock_in_id") REFERENCES "stock_in_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_in_table" ADD CONSTRAINT "stock_in_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_out_detail_table" ADD CONSTRAINT "stock_out_detail_table_stock_in_id_fkey" FOREIGN KEY ("stock_in_id") REFERENCES "stock_out_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_out_table" ADD CONSTRAINT "stock_out_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_take_detail_table" ADD CONSTRAINT "stock_take_detail_table_stock_take_id_fkey" FOREIGN KEY ("stock_take_id") REFERENCES "stock_take_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_take_table" ADD CONSTRAINT "stock_take_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_requisition_detail_table" ADD CONSTRAINT "store_requisition_detail_table_store_requisition_id_fkey" FOREIGN KEY ("store_requisition_id") REFERENCES "store_requisition_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_requisition_table" ADD CONSTRAINT "store_requisition_table_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "inventory_transaction_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
