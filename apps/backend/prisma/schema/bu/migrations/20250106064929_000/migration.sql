-- CreateEnum
CREATE TYPE "enum_activity_action" AS ENUM ('view', 'create', 'update', 'delete', 'login', 'other');

-- CreateEnum
CREATE TYPE "enum_inventory_doc_type" AS ENUM ('good_receive_note', 'credit_note', 'store_requisition', 'stock_in', 'stock_out', 'stock_take');

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

-- CreateEnum
CREATE TYPE "enum_vendor_address_type" AS ENUM ('contact_address', 'mailing_address', 'register_address');

-- CreateEnum
CREATE TYPE "enum_vendor_contact_type" AS ENUM ('phone', 'email');

-- CreateEnum
CREATE TYPE "enum_workflow_type" AS ENUM ('purchase_request', 'purchase_order', 'store_requisition');

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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,

    CONSTRAINT "tb_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_credit_note" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "workflow" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_credit_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_credit_note_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "credit_note_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "amount" DECIMAL(15,5),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
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
    "rate" DOUBLE PRECISION DEFAULT 1,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_delivery_point" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_delivery_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_department" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_exchange_rate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "at_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "currency_id" UUID,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_exchange_rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_good_receive_note" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "workflow" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_good_receive_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_good_receive_note_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "good_receive_note_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_good_receive_note_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_inventory_transaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "inventory_doc_type" "enum_inventory_doc_type" NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_inventory_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_inventory_transaction_closing_balance" (
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

    CONSTRAINT "tb_inventory_transaction_closing_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_inventory_transaction_detail" (
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

    CONSTRAINT "tb_inventory_transaction_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_location" (
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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product" (
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

    CONSTRAINT "tb_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_info" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID NOT NULL,
    "price" DOUBLE PRECISION,
    "info" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_tb_vendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "product_id" UUID,
    "vendor_id" UUID,
    "vendor_product_name" VARCHAR,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_product_tb_vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "purchase_order_status" "enum_purchase_order_doc_status" DEFAULT 'open',
    "description" TEXT,
    "order_date" DATE,
    "history" JSON,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
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
    "history" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_order_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reference_name" VARCHAR NOT NULL,
    "purchase_request_date" DATE,
    "workflow_id" UUID,
    "workflow_obj" JSON,
    "workflow_history" JSON,
    "purchase_request_status" "enum_purchase_request_doc_status" DEFAULT 'draft',
    "requestor_id" UUID,
    "department_id" UUID,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_purchase_request_detail" (
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
    "workflow_history" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_purchase_request_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_in" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "workflow" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_in_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stock_in_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_in_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_out" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "workflow" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_out_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_out_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stock_in_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_out_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_take" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "workflow" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_take_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_stock_take_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stock_take_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_stock_take_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_store_requisition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_transaction_id" UUID NOT NULL,
    "name" VARCHAR,
    "workflow" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_store_requisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_store_requisition_detail" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "store_requisition_id" UUID NOT NULL,
    "name" VARCHAR,
    "qty" DECIMAL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_store_requisition_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_unit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_unit_conversion" (
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

    CONSTRAINT "tb_unit_conversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_vendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
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
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_vendor_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_workflow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "workflow_type" "enum_workflow_type" NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,

    CONSTRAINT "tb_workflow_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "tb_inventory_transaction_name_key" ON "tb_inventory_transaction"("name");

-- CreateIndex
CREATE INDEX "inventorytransaction_name_idx" ON "tb_inventory_transaction"("name");

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
CREATE INDEX "PO_name_u" ON "tb_purchase_order"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_purchase_order_detail_name_key" ON "tb_purchase_order_detail"("name");

-- CreateIndex
CREATE INDEX "PO1_name_u" ON "tb_purchase_order_detail"("name");

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

-- AddForeignKey
ALTER TABLE "tb_credit_note" ADD CONSTRAINT "tb_credit_note_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_credit_note_detail" ADD CONSTRAINT "tb_credit_note_detail_credit_note_id_fkey" FOREIGN KEY ("credit_note_id") REFERENCES "tb_credit_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_exchange_rate" ADD CONSTRAINT "tb_exchange_rate_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "tb_currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note" ADD CONSTRAINT "tb_good_receive_note_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_good_receive_note_detail" ADD CONSTRAINT "tb_good_receive_note_detail_good_receive_note_id_fkey" FOREIGN KEY ("good_receive_note_id") REFERENCES "tb_good_receive_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_inventory_transaction_closing_balance" ADD CONSTRAINT "tb_inventory_transaction_clos_inventory_transaction_detail_fkey" FOREIGN KEY ("inventory_transaction_detail_id") REFERENCES "tb_inventory_transaction_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_inventory_transaction_detail" ADD CONSTRAINT "tb_inventory_transaction_detail_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_location" ADD CONSTRAINT "tb_location_delivery_point_id_fkey" FOREIGN KEY ("delivery_point_id") REFERENCES "tb_delivery_point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_primary_unit_fkey" FOREIGN KEY ("primary_unit") REFERENCES "tb_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_info" ADD CONSTRAINT "tb_product_info_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_item_group" ADD CONSTRAINT "tb_product_item_group_product_subcategory_id_fkey" FOREIGN KEY ("product_subcategory_id") REFERENCES "tb_product_sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_sub_category" ADD CONSTRAINT "tb_product_sub_category_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "tb_product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_tb_vendor" ADD CONSTRAINT "tb_product_tb_vendor_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "tb_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_product_tb_vendor" ADD CONSTRAINT "tb_product_tb_vendor_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "tb_vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order_detail" ADD CONSTRAINT "tb_purchase_order_detail_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "tb_purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_order_detail" ADD CONSTRAINT "tb_purchase_order_detail_purchase_request_detail_id_fkey" FOREIGN KEY ("purchase_request_detail_id") REFERENCES "tb_purchase_request_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request" ADD CONSTRAINT "tb_purchase_request_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "tb_workflow"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_purchase_request_detail" ADD CONSTRAINT "tb_purchase_request_detail_purchase_request_id_fkey" FOREIGN KEY ("purchase_request_id") REFERENCES "tb_purchase_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_in" ADD CONSTRAINT "tb_stock_in_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_in_detail" ADD CONSTRAINT "tb_stock_in_detail_stock_in_id_fkey" FOREIGN KEY ("stock_in_id") REFERENCES "tb_stock_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_out" ADD CONSTRAINT "tb_stock_out_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_out_detail" ADD CONSTRAINT "tb_stock_out_detail_stock_in_id_fkey" FOREIGN KEY ("stock_in_id") REFERENCES "tb_stock_out"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_take" ADD CONSTRAINT "tb_stock_take_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_stock_take_detail" ADD CONSTRAINT "tb_stock_take_detail_stock_take_id_fkey" FOREIGN KEY ("stock_take_id") REFERENCES "tb_stock_take"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_store_requisition" ADD CONSTRAINT "tb_store_requisition_inventory_transaction_id_fkey" FOREIGN KEY ("inventory_transaction_id") REFERENCES "tb_inventory_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
