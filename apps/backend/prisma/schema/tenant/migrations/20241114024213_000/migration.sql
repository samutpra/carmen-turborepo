-- CreateEnum
CREATE TYPE "EnumInvDocType" AS ENUM ('GRN', 'CN', 'SR', 'ISSUE', 'ADJ', 'SI', 'SO');
-- CreateEnum
CREATE TYPE "EnumLocationType" AS ENUM ('Inventory', 'Direct');
-- CreateEnum
CREATE TYPE "EnumPOStatus" AS ENUM (
    'Open',
    'Voided',
    'Closed',
    'Draft',
    'Sent',
    'Partial',
    'FullyReceived',
    'Cancelled',
    'Deleted'
);
-- CreateEnum
CREATE TYPE "EnumPRDocStatus" AS ENUM ('Draft', 'WIP', 'Complete');
-- CreateEnum
CREATE TYPE "EnumPRWorkflowStatus" AS ENUM ('Draft', 'Pending', 'Review', 'Accept');
-- CreateEnum
CREATE TYPE "EnumUnitType" AS ENUM ('OrderUnit', 'InventoryUnit', 'RecipeUnit');
-- CreateTable
CREATE TABLE "AddressType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "AddressType_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ContactType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" UUID NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ContactType_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Currency" (
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
    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "DeliveryPoint" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "DeliveryPoint_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Department" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT DEFAULT '',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ExchangeRate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "currencyId" UUID,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "locationType" "EnumLocationType" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "deliveryPointId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Product" (
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
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ProductInfo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "price" DOUBLE PRECISION,
    "info" JSON,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ProductInfo_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ProductItemGroup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "productSubCategoryId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ProductItemGroup_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ProductSubCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "productCategoryId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ProductSubCategory_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "ProductVendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendorId" UUID,
    "productId" UUID,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "ProductVendor_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Unit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "UnitConversion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID,
    "unitType" "EnumUnitType" NOT NULL,
    "fromUnitId" UUID,
    "toUnitId" UUID,
    "rate" DOUBLE PRECISION DEFAULT 1,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "UnitConversion_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Vendor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "VendorAddress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendorId" UUID,
    "addressTypeId" UUID NOT NULL,
    "address" JSON,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "VendorAddress_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "VendorContact" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "vendorId" UUID,
    "contactTypeId" UUID NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "VendorContact_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Menu" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(5) NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "isVisible" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "GRN0" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "GRN0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "GRN1" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "GRN0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "GRN1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PR0" (
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
    CONSTRAINT "PR0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PR1" (
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
    "price" DECIMAL(15, 5),
    "totalPrice" DECIMAL(15, 5),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "PR1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PR1Workflow" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PR1Id" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    CONSTRAINT "PR1Workflow_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PRType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "PRType_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SI0" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "SI0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SI1" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "SI0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "SI1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SO0" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "SO0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SO1" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "SO0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "SO1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SR0" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "SR0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "SR1" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "SR0Id" UUID NOT NULL,
    "name" VARCHAR,
    CONSTRAINT "SR1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PO0" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "PO0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PO1" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "PO0Id" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,
    CONSTRAINT "PO1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "INV0" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "invDocType" "EnumInvDocType",
    CONSTRAINT "INV0_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "INV1" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv0Id" UUID NOT NULL,
    "fromLot" UUID,
    "currentLotName" VARCHAR,
    "qty" DECIMAL,
    "cost" DECIMAL(15, 5),
    CONSTRAINT "INV1_pkey" PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "INV2" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inv1Id" UUID NOT NULL,
    "lotName" VARCHAR,
    "lotIndex" INTEGER NOT NULL DEFAULT 1,
    "qty" DECIMAL,
    "cost" DECIMAL(15, 5),
    CONSTRAINT "INV2_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "AddressType_name_key" ON "AddressType"("name");
-- CreateIndex
CREATE INDEX "addresstype_name_u" ON "AddressType"("name");
-- CreateIndex
CREATE UNIQUE INDEX "ContactType_name_key" ON "ContactType"("name");
-- CreateIndex
CREATE INDEX "contacttype_name_u" ON "ContactType"("name");
-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");
-- CreateIndex
CREATE INDEX "currency_code_u" ON "Currency"("code");
-- CreateIndex
CREATE UNIQUE INDEX "DeliveryPoint_name_key" ON "DeliveryPoint"("name");
-- CreateIndex
CREATE INDEX "deliverypoint_name_u" ON "DeliveryPoint"("name");
-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
-- CreateIndex
CREATE INDEX "department_name_u" ON "Department"("name");
-- CreateIndex
CREATE UNIQUE INDEX "exchangerate_dateat_currencyid_u" ON "ExchangeRate"("dateAt", "currencyId");
-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");
-- CreateIndex
CREATE INDEX "location_name_u" ON "Location"("name");
-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");
-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
-- CreateIndex
CREATE INDEX "product_code_u" ON "Product"("code");
-- CreateIndex
CREATE INDEX "product_name_u" ON "Product"("name");
-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "ProductCategory"("name");
-- CreateIndex
CREATE INDEX "productcategory_name_u" ON "ProductCategory"("name");
-- CreateIndex
CREATE UNIQUE INDEX "ProductInfo_productId_key" ON "ProductInfo"("productId");
-- CreateIndex
CREATE INDEX "productinfo_productid_u" ON "ProductInfo"("productId");
-- CreateIndex
CREATE UNIQUE INDEX "ProductItemGroup_name_key" ON "ProductItemGroup"("name");
-- CreateIndex
CREATE INDEX "productitemgroup_name_u" ON "ProductItemGroup"("name");
-- CreateIndex
CREATE UNIQUE INDEX "ProductSubCategory_name_key" ON "ProductSubCategory"("name");
-- CreateIndex
CREATE INDEX "productsubcategory_name_u" ON "ProductSubCategory"("name");
-- CreateIndex
CREATE UNIQUE INDEX "productvendor_vendorid_productid_u" ON "ProductVendor"("vendorId", "productId");
-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
-- CreateIndex
CREATE INDEX "unit_name_u" ON "Unit"("name");
-- CreateIndex
CREATE INDEX "unitconversion_productid_unittype_u" ON "UnitConversion"("productId", "unitType");
-- CreateIndex
CREATE UNIQUE INDEX "Vendor_name_key" ON "Vendor"("name");
-- CreateIndex
CREATE INDEX "vendor_name_u" ON "Vendor"("name");
-- CreateIndex
CREATE UNIQUE INDEX "vendorcontact_vendorid_addresstypeid_u" ON "VendorAddress"("vendorId", "addressTypeId");
-- CreateIndex
CREATE UNIQUE INDEX "vendorcontact_vendorid_contacttypeid_u" ON "VendorContact"("vendorId", "contactTypeId");
-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");
-- CreateIndex
CREATE INDEX "menu_name_u" ON "Menu"("name");
-- CreateIndex
CREATE UNIQUE INDEX "PR0_refName_key" ON "PR0"("refName");
-- CreateIndex
CREATE INDEX "PR0_refname_u" ON "PR0"("refName");
-- CreateIndex
CREATE UNIQUE INDEX "PRType_name_key" ON "PRType"("name");
-- CreateIndex
CREATE INDEX "PRtype_name_u" ON "PRType"("name");
-- CreateIndex
CREATE UNIQUE INDEX "PO0_name_key" ON "PO0"("name");
-- CreateIndex
CREATE INDEX "PO_name_u" ON "PO0"("name");
-- CreateIndex
CREATE UNIQUE INDEX "PO1_name_key" ON "PO1"("name");
-- CreateIndex
CREATE INDEX "PO1_name_u" ON "PO1"("name");
-- CreateIndex
CREATE UNIQUE INDEX "INV0_name_key" ON "INV0"("name");
-- CreateIndex
CREATE UNIQUE INDEX "inv2_lotname_lotindex_u" ON "INV2"("lotName", "lotIndex");
-- AddForeignKey
ALTER TABLE "ExchangeRate"
ADD CONSTRAINT "ExchangeRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "Location"
ADD CONSTRAINT "Location_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "DeliveryPoint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "Product"
ADD CONSTRAINT "Product_primaryUnit_fkey" FOREIGN KEY ("primaryUnit") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "ProductInfo"
ADD CONSTRAINT "ProductInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "ProductItemGroup"
ADD CONSTRAINT "ProductItemGroup_productSubCategoryId_fkey" FOREIGN KEY ("productSubCategoryId") REFERENCES "ProductSubCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "ProductSubCategory"
ADD CONSTRAINT "ProductSubCategory_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "ProductVendor"
ADD CONSTRAINT "ProductVendor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "ProductVendor"
ADD CONSTRAINT "ProductVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "UnitConversion"
ADD CONSTRAINT "UnitConversion_fromUnitId_fkey" FOREIGN KEY ("fromUnitId") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "UnitConversion"
ADD CONSTRAINT "UnitConversion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "UnitConversion"
ADD CONSTRAINT "UnitConversion_toUnitId_fkey" FOREIGN KEY ("toUnitId") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "VendorAddress"
ADD CONSTRAINT "VendorAddress_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "AddressType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "VendorAddress"
ADD CONSTRAINT "VendorAddress_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "VendorContact"
ADD CONSTRAINT "VendorContact_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "ContactType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "VendorContact"
ADD CONSTRAINT "VendorContact_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "GRN0"
ADD CONSTRAINT "GRN0_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "INV0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "GRN1"
ADD CONSTRAINT "GRN1_GRN0Id_fkey" FOREIGN KEY ("GRN0Id") REFERENCES "GRN0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "PR0"
ADD CONSTRAINT "PR0_prTypeId_fkey" FOREIGN KEY ("prTypeId") REFERENCES "PRType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "PR1"
ADD CONSTRAINT "PR1_PR0Id_fkey" FOREIGN KEY ("PR0Id") REFERENCES "PR0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "PR1Workflow"
ADD CONSTRAINT "PR1Workflow_PR1Id_fkey" FOREIGN KEY ("PR1Id") REFERENCES "PR1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "SI0"
ADD CONSTRAINT "SI0_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "INV0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "SI1"
ADD CONSTRAINT "SI1_SI0Id_fkey" FOREIGN KEY ("SI0Id") REFERENCES "SI0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "SO0"
ADD CONSTRAINT "SO0_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "INV0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "SO1"
ADD CONSTRAINT "SO1_SO0Id_fkey" FOREIGN KEY ("SO0Id") REFERENCES "SO0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "SR0"
ADD CONSTRAINT "SR0_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "INV0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "SR1"
ADD CONSTRAINT "SR1_SR0Id_fkey" FOREIGN KEY ("SR0Id") REFERENCES "SR0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "PO1"
ADD CONSTRAINT "PO1_PO0Id_fkey" FOREIGN KEY ("PO0Id") REFERENCES "PO0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "INV1"
ADD CONSTRAINT "INV1_inv0Id_fkey" FOREIGN KEY ("inv0Id") REFERENCES "INV0"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "INV2"
ADD CONSTRAINT "INV2_inv1Id_fkey" FOREIGN KEY ("inv1Id") REFERENCES "INV1"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;