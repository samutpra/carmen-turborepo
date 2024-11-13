-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('OrderUnit', 'InventoryUnit', 'RecipeUnit');

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
CREATE TABLE "PurchaseOrder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "purchaseOrderId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "prTypeId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "PurchaseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequestItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "purchaseRequestId" UUID,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "PurchaseRequestItem_pkey" PRIMARY KEY ("id")
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
    "unitType" "UnitType" NOT NULL,
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
CREATE TABLE "PurchaseRequestType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createById" UUID,
    "updateAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateById" UUID,

    CONSTRAINT "PurchaseRequestType_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "PurchaseOrder_name_key" ON "PurchaseOrder"("name");

-- CreateIndex
CREATE INDEX "purchaseorder_name_u" ON "PurchaseOrder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrderItem_name_key" ON "PurchaseOrderItem"("name");

-- CreateIndex
CREATE INDEX "purchaseorderitem_name_u" ON "PurchaseOrderItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequest_name_key" ON "PurchaseRequest"("name");

-- CreateIndex
CREATE INDEX "purchaserequest_name_u" ON "PurchaseRequest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequestItem_name_key" ON "PurchaseRequestItem"("name");

-- CreateIndex
CREATE INDEX "purchaserequestitem_name_u" ON "PurchaseRequestItem"("name");

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
CREATE UNIQUE INDEX "PurchaseRequestType_name_key" ON "PurchaseRequestType"("name");

-- CreateIndex
CREATE INDEX "purchaserequesttype_name_u" ON "PurchaseRequestType"("name");

-- AddForeignKey
ALTER TABLE "ExchangeRate" ADD CONSTRAINT "ExchangeRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "DeliveryPoint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_primaryUnit_fkey" FOREIGN KEY ("primaryUnit") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductInfo" ADD CONSTRAINT "ProductInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductItemGroup" ADD CONSTRAINT "ProductItemGroup_productSubCategoryId_fkey" FOREIGN KEY ("productSubCategoryId") REFERENCES "ProductSubCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductSubCategory" ADD CONSTRAINT "ProductSubCategory_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductVendor" ADD CONSTRAINT "ProductVendor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductVendor" ADD CONSTRAINT "ProductVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PurchaseRequest" ADD CONSTRAINT "PurchaseRequest_prTypeId_fkey" FOREIGN KEY ("prTypeId") REFERENCES "PurchaseRequestType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PurchaseRequestItem" ADD CONSTRAINT "PurchaseRequestItem_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES "PurchaseRequest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_fromUnitId_fkey" FOREIGN KEY ("fromUnitId") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_toUnitId_fkey" FOREIGN KEY ("toUnitId") REFERENCES "Unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VendorAddress" ADD CONSTRAINT "VendorAddress_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "AddressType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VendorAddress" ADD CONSTRAINT "VendorAddress_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VendorContact" ADD CONSTRAINT "VendorContact_contactTypeId_fkey" FOREIGN KEY ("contactTypeId") REFERENCES "ContactType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VendorContact" ADD CONSTRAINT "VendorContact_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
