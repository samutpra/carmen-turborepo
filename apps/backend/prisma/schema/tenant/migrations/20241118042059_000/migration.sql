-- CreateEnum
CREATE TYPE "enum_activity_action" AS ENUM ('read', 'create', 'update', 'delete', 'login', 'other');

-- CreateEnum
CREATE TYPE "enum_inventory_doc_type" AS ENUM ('GRN', 'CN', 'SR', 'ISSUE', 'ADJ', 'SI', 'SO');

-- CreateEnum
CREATE TYPE "enum_location_type" AS ENUM ('Inventory', 'Direct', 'Consignment');

-- CreateEnum
CREATE TYPE "enum_purchase_order_status" AS ENUM ('Open', 'Voided', 'Closed', 'Draft', 'Sent', 'Partial', 'FullyReceived', 'Cancelled', 'Deleted');

-- CreateEnum
CREATE TYPE "enum_purchase_request_doc_status" AS ENUM ('Draft', 'WIP', 'Complete');

-- CreateEnum
CREATE TYPE "enum_purchase_request_workflow_status" AS ENUM ('Draft', 'Pending', 'Review', 'Accept');

-- CreateEnum
CREATE TYPE "enum_unit_type" AS ENUM ('OrderUnit', 'InventoryUnit', 'RecipeUnit');

-- CreateTable
CREATE TABLE "address_type_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "address_type_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_type_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "contact_type_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "symbol" VARCHAR(5),
    "description" TEXT DEFAULT '',
    "isActive" BOOLEAN DEFAULT true,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "currency_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_point_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "delivery_point_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "department_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchange_rate_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "currencyId" UUID,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "exchange_rate_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_activity_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "action" "enum_activity_action",
    "entityType" VARCHAR(100),
    "entityId" UUID,
    "actorId" UUID,
    "metadata" JSON,
    "oldData" JSON,
    "newData" JSON,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,

    CONSTRAINT "global_activity_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "good_receive_note_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "good_receive_note_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "good_receive_note_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "GRN0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "good_receive_note_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "invDocType" "enum_inventory_doc_type",

    CONSTRAINT "inventory_transaction_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "fromLot" UUID,
    "currentLotName" VARCHAR,
    "qty" DECIMAL,
    "cost" DECIMAL(15,5),

    CONSTRAINT "inventory_transaction_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction_2_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv1Id" UUID NOT NULL,
    "lotName" VARCHAR,
    "lotIndex" INTEGER NOT NULL DEFAULT 1,
    "qty" DECIMAL,
    "cost" DECIMAL(15,5),

    CONSTRAINT "inventory_transaction_2_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "locationType" "enum_location_type" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "deliveryPointId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "location_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(5) NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "isVisible" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "menu_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "product_category_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_info_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "price" DOUBLE PRECISION,
    "info" JSON,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "product_info_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_item_group_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "productSubCategoryId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "product_item_group_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sub_category_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "productCategoryId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "product_sub_category_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "primaryUnit" UUID NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "product_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_vendor_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendorId" UUID,
    "productId" UUID,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "product_vendor_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "purchase_order_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "PO0Id" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "purchase_order_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "refName" VARCHAR NOT NULL,
    "prDate" DATE,
    "prTypeId" UUID,
    "requestorId" UUID,
    "departmentId" UUID,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "purchase_request_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PR0Id" UUID,
    "locationId" UUID,
    "productId" UUID,
    "unitId" UUID,
    "description" TEXT,
    "requestQty" DOUBLE PRECISION,
    "approveQty" DOUBLE PRECISION,
    "currencyId" UUID,
    "currencyRate" DOUBLE PRECISION,
    "price" DECIMAL(15,5),
    "totalPrice" DECIMAL(15,5),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "purchase_request_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_1_workflow_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PR1Id" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,

    CONSTRAINT "purchase_request_1_workflow_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_request_type_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "purchase_request_type_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_in_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "stock_in_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_in_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "SI0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "stock_in_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_out_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "stock_out_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_out_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "SO0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "stock_out_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_requisition_0_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "store_requisition_0_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_requisition_1_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "SR0Id" UUID NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "store_requisition_1_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_conversion_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID,
    "unitType" "enum_unit_type" NOT NULL,
    "fromUnitId" UUID,
    "toUnitId" UUID,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "unit_conversion_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "unit_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_address_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendorId" UUID,
    "addressTypeId" UUID NOT NULL,
    "address" JSON,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "vendor_address_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_contact_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendorId" UUID,
    "contactTypeId" UUID NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "vendor_contact_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "vendor_table_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "exchangerate_dateat_currencyid_u" ON "exchange_rate_table"("dateAt", "currencyId");

-- CreateIndex
CREATE INDEX "global_activity_entitytype_entityid_idx" ON "global_activity_table"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "global_activity_table_action_idx" ON "global_activity_table"("action");

-- CreateIndex
CREATE INDEX "global_activity_table_actorId_idx" ON "global_activity_table"("actorId");

-- CreateIndex
CREATE INDEX "global_activity_table_createdAt_idx" ON "global_activity_table"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_transaction_0_table_name_key" ON "inventory_transaction_0_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inv2_lotname_lotindex_u" ON "inventory_transaction_2_table"("lotName", "lotIndex");

-- CreateIndex
CREATE UNIQUE INDEX "location_table_name_key" ON "location_table"("name");

-- CreateIndex
CREATE INDEX "location_name_u" ON "location_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_table_name_key" ON "menu_table"("name");

-- CreateIndex
CREATE INDEX "menu_name_u" ON "menu_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_table_name_key" ON "product_category_table"("name");

-- CreateIndex
CREATE INDEX "productcategory_name_u" ON "product_category_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_info_table_productId_key" ON "product_info_table"("productId");

-- CreateIndex
CREATE INDEX "productinfo_productid_u" ON "product_info_table"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_item_group_table_name_key" ON "product_item_group_table"("name");

-- CreateIndex
CREATE INDEX "productitemgroup_name_u" ON "product_item_group_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_sub_category_table_name_key" ON "product_sub_category_table"("name");

-- CreateIndex
CREATE INDEX "productsubcategory_name_u" ON "product_sub_category_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_table_code_key" ON "product_table"("code");

-- CreateIndex
CREATE UNIQUE INDEX "product_table_name_key" ON "product_table"("name");

-- CreateIndex
CREATE INDEX "product_code_u" ON "product_table"("code");

-- CreateIndex
CREATE INDEX "product_name_u" ON "product_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productvendor_vendorid_productid_u" ON "product_vendor_table"("vendorId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_0_table_name_key" ON "purchase_order_0_table"("name");

-- CreateIndex
CREATE INDEX "PO_name_u" ON "purchase_order_0_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_1_table_name_key" ON "purchase_order_1_table"("name");

-- CreateIndex
CREATE INDEX "PO1_name_u" ON "purchase_order_1_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_request_0_table_refName_key" ON "purchase_request_0_table"("refName");

-- CreateIndex
CREATE INDEX "PR0_refname_u" ON "purchase_request_0_table"("refName");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_request_type_table_name_key" ON "purchase_request_type_table"("name");

-- CreateIndex
CREATE INDEX "PRtype_name_u" ON "purchase_request_type_table"("name");

-- CreateIndex
CREATE INDEX "unitconversion_productid_unittype_u" ON "unit_conversion_table"("productId", "unitType");

-- CreateIndex
CREATE UNIQUE INDEX "unit_table_name_key" ON "unit_table"("name");

-- CreateIndex
CREATE INDEX "unit_name_u" ON "unit_table"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vendorcontact_vendorid_addresstypeid_u" ON "vendor_address_table"("vendorId", "addressTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "vendorcontact_vendorid_contacttypeid_u" ON "vendor_contact_table"("vendorId", "contactTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_table_name_key" ON "vendor_table"("name");

-- CreateIndex
CREATE INDEX "vendor_name_u" ON "vendor_table"("name");

-- AddForeignKey
ALTER TABLE "exchange_rate_table" ADD CONSTRAINT "exchange_rate_table_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "good_receive_note_0_table" ADD CONSTRAINT "good_receive_note_0_table_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "inventory_transaction_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "good_receive_note_1_table" ADD CONSTRAINT "good_receive_note_1_table_GRN0Id_fkey" FOREIGN KEY ("GRN0Id") REFERENCES "good_receive_note_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_transaction_1_table" ADD CONSTRAINT "inventory_transaction_1_table_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "inventory_transaction_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_transaction_2_table" ADD CONSTRAINT "inventory_transaction_2_table_inv1Id_fkey" FOREIGN KEY ("inv1Id") REFERENCES "inventory_transaction_1_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location_table" ADD CONSTRAINT "location_table_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "delivery_point_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_info_table" ADD CONSTRAINT "product_info_table_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_item_group_table" ADD CONSTRAINT "product_item_group_table_productSubCategoryId_fkey" FOREIGN KEY ("productSubCategoryId") REFERENCES "product_sub_category_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_sub_category_table" ADD CONSTRAINT "product_sub_category_table_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "product_category_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_table" ADD CONSTRAINT "product_table_primaryUnit_fkey" FOREIGN KEY ("primaryUnit") REFERENCES "unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_vendor_table" ADD CONSTRAINT "product_vendor_table_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_vendor_table" ADD CONSTRAINT "product_vendor_table_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_order_1_table" ADD CONSTRAINT "purchase_order_1_table_PO0Id_fkey" FOREIGN KEY ("PO0Id") REFERENCES "purchase_order_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_request_0_table" ADD CONSTRAINT "purchase_request_0_table_prTypeId_fkey" FOREIGN KEY ("prTypeId") REFERENCES "purchase_request_type_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_request_1_table" ADD CONSTRAINT "purchase_request_1_table_PR0Id_fkey" FOREIGN KEY ("PR0Id") REFERENCES "purchase_request_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase_request_1_workflow_table" ADD CONSTRAINT "purchase_request_1_workflow_table_PR1Id_fkey" FOREIGN KEY ("PR1Id") REFERENCES "purchase_request_1_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_in_0_table" ADD CONSTRAINT "stock_in_0_table_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "inventory_transaction_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_in_1_table" ADD CONSTRAINT "stock_in_1_table_SI0Id_fkey" FOREIGN KEY ("SI0Id") REFERENCES "stock_in_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_out_0_table" ADD CONSTRAINT "stock_out_0_table_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "inventory_transaction_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_out_1_table" ADD CONSTRAINT "stock_out_1_table_SO0Id_fkey" FOREIGN KEY ("SO0Id") REFERENCES "stock_out_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_requisition_0_table" ADD CONSTRAINT "store_requisition_0_table_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "inventory_transaction_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "store_requisition_1_table" ADD CONSTRAINT "store_requisition_1_table_SR0Id_fkey" FOREIGN KEY ("SR0Id") REFERENCES "store_requisition_0_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_conversion_table" ADD CONSTRAINT "unit_conversion_table_fromUnitId_fkey" FOREIGN KEY ("fromUnitId") REFERENCES "unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_conversion_table" ADD CONSTRAINT "unit_conversion_table_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_conversion_table" ADD CONSTRAINT "unit_conversion_table_toUnitId_fkey" FOREIGN KEY ("toUnitId") REFERENCES "unit_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_address_table" ADD CONSTRAINT "vendor_address_table_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "address_type_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_address_table" ADD CONSTRAINT "vendor_address_table_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_contact_table" ADD CONSTRAINT "vendor_contact_table_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "contact_type_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vendor_contact_table" ADD CONSTRAINT "vendor_contact_table_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
