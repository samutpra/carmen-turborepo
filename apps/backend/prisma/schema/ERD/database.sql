CREATE SCHEMA "CARMEN_SYSTEM";
CREATE SCHEMA "TENANT_DUMMY";
CREATE TYPE "CARMEN_SYSTEM"."EnumSubscriptionStatus" AS ENUM ('Active', 'Inactive', 'expired');
CREATE TYPE "TENANT_DUMMY"."EnumLocationType" AS ENUM ('Inventory', 'Direct');
CREATE TYPE "TENANT_DUMMY"."EnumUnitType" AS ENUM (
  'OrderUnit',
  'InventoryUnit',
  'RecipeUnit'
);
CREATE TYPE "TENANT_DUMMY"."EnumPRDocStatus" AS ENUM ('Draft', 'WIP', 'Complete');
CREATE TYPE "TENANT_DUMMY"."EnumPRWorkflowStatus" AS ENUM ('Draft', 'Pending', 'Review', 'Accept');
CREATE TYPE "TENANT_DUMMY"."EnumPOStatus" AS ENUM (
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
CREATE TYPE "TENANT_DUMMY"."EnumInvDocType" AS ENUM (
  'GRN',
  'CN',
  'SR',
  'ISSUE',
  'ADJ',
  'SI',
  'SO'
);
CREATE TABLE "CARMEN_SYSTEM"."User" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "username" varchar(30) UNIQUE NOT NULL,
  "email" varchar(255) NOT NULL,
  "consent" timestamp,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Password" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid NOT NULL,
  "hash" text NOT NULL,
  "isActive" bool DEFAULT false,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP)
);
CREATE TABLE "CARMEN_SYSTEM"."UserProfile" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid,
  "firstname" varchar(100),
  "middlename" varchar(100),
  "lastname" varchar(100),
  "bio" json,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Module" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."BusinessUnitModule" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "businessUnitId" uuid NOT NULL,
  "moduleId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Subscription" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "clusterId" uuid NOT NULL,
  "startDate" date NOT NULL,
  "endDate" date NOT NULL,
  "status" "CARMEN_SYSTEM"."EnumSubscriptionStatus" NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."SubscriptionDetail" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "subscriptionId" uuid NOT NULL,
  "bussinessUnitId" uuid NOT NULL,
  "moduleId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Cluster" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(30) UNIQUE NOT NULL,
  "name" text UNIQUE NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."BusinessUnit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "clusterId" uuid NOT NULL,
  "code" varchar(30) NOT NULL,
  "name" text NOT NULL,
  "isHq" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."UserBusinessUnit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid,
  "businessunitId" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."NotificationPreference" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid UNIQUE NOT NULL,
  "isEmail" bool NOT NULL DEFAULT false,
  "isSMS" bool DEFAULT false,
  "isInApp" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Notification" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid NOT NULL,
  "message" text,
  "isRead" bool DEFAULT false,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Role" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "bussinessUnitId" uuid NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."Permission" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "canGet" bool NOT NULL DEFAULT true,
  "canCreate" bool NOT NULL DEFAULT true,
  "canUpdate" bool NOT NULL DEFAULT true,
  "canDelete" bool NOT NULL DEFAULT true,
  "canPrint" bool NOT NULL DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."UserRole" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid NOT NULL,
  "roleId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."RolePermission" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "roleId" uuid NOT NULL,
  "permissionId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Menu" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar(5) UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "isVisible" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Currency" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(3) UNIQUE NOT NULL,
  "name" varchar(100) NOT NULL,
  "symbol" varchar(5),
  "description" text DEFAULT '',
  "isActive" bool DEFAULT true,
  "rate" float DEFAULT 1,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ExchangeRate" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "dateAt" timestamp DEFAULT (now()),
  "currencyId" uuid,
  "rate" float DEFAULT 1,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Location" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "locationType" "TENANT_DUMMY"."EnumLocationType" NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "deliveryPointId" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."DeliveryPoint" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Unit" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."UnitConversion" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "productId" uuid,
  "unitType" "TENANT_DUMMY"."EnumUnitType" NOT NULL,
  "fromUnitId" uuid,
  "toUnitId" uuid,
  "rate" float DEFAULT 1,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Department" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Product" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar UNIQUE NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "primaryUnit" uuid NOT NULL,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ProductInfo" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "productId" uuid UNIQUE NOT NULL,
  "price" Float,
  "info" json,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ProductCategory" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ProductSubCategory" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "productCategoryId" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ProductItemGroup" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "productSubCategoryId" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."PRType" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."PR0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "refName" varchar UNIQUE NOT NULL,
  "prDate" date,
  "prTypeId" uuid,
  "requestorId" uuid,
  "departmentId" uuid,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."PR1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "PR0Id" uuid,
  "locationId" uuid,
  "productId" uuid,
  "unitId" uuid,
  "description" text,
  "requestQty" float,
  "approveQty" float,
  "currencyId" uuid,
  "currencyRate" float,
  "price" numeric(15, 5),
  "totalPrice" numeric(15, 5),
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."PR1Workflow" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "PR1Id" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid
);
CREATE TABLE "TENANT_DUMMY"."PO0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."PO1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE,
  "description" text,
  "isActive" bool DEFAULT true,
  "PO0Id" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."Vendor" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ContactType" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" uuid UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."VendorContact" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendorId" uuid,
  "contactTypeId" uuid NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."AddressType" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" uuid UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."VendorAddress" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendorId" uuid,
  "addressTypeId" uuid NOT NULL,
  "address" json,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."ProductVendor" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "vendorId" uuid,
  "productId" uuid,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."INV0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "invDocType" "TENANT_DUMMY"."EnumInvDocType"
);
CREATE TABLE "TENANT_DUMMY"."INV1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "fromLot" uuid,
  "currentLotName" varchar,
  "qty" decimal,
  "cost" numeric(15, 5)
);
CREATE TABLE "TENANT_DUMMY"."INV2" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv1Id" uuid NOT NULL,
  "lotName" varchar,
  "lotIndex" integer NOT NULL DEFAULT 1,
  "qty" decimal,
  "cost" numeric(15, 5)
);
CREATE TABLE "TENANT_DUMMY"."GRN0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."GRN1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "GRN0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."SR0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."SR1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "SR0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."SI0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."SI1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "SI0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."SO0" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."SO1" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "SO0Id" uuid NOT NULL,
  "name" varchar
);
CREATE INDEX "user_username_idx" ON "CARMEN_SYSTEM"."User" ("username");
CREATE INDEX "user_email_idx" ON "CARMEN_SYSTEM"."User" ("email");
CREATE INDEX "password_userid_idx" ON "CARMEN_SYSTEM"."Password" ("userId");
CREATE INDEX "userprofile_userid_idx" ON "CARMEN_SYSTEM"."UserProfile" ("userId");
CREATE INDEX "userprofile_firstname_lastname_idx" ON "CARMEN_SYSTEM"."UserProfile" ("firstname", "lastname");
CREATE INDEX "module_name_idx" ON "CARMEN_SYSTEM"."Module" ("name");
CREATE INDEX "businessunitmodule_businessunitid_moduleid_u" ON "CARMEN_SYSTEM"."BusinessUnitModule" ("businessUnitId", "moduleId");
CREATE UNIQUE INDEX "subscriptiondetail_subscriptionid_businessunitid_moduleid_u" ON "CARMEN_SYSTEM"."SubscriptionDetail" ("subscriptionId", "bussinessUnitId", "moduleId");
CREATE UNIQUE INDEX "cluster_code_u" ON "CARMEN_SYSTEM"."Cluster" ("code");
CREATE UNIQUE INDEX "cluster_name_u" ON "CARMEN_SYSTEM"."Cluster" ("name");
CREATE INDEX "tenant_clusertid_idx" ON "CARMEN_SYSTEM"."BusinessUnit" ("clusterId");
CREATE INDEX "businessunit_code_idx" ON "CARMEN_SYSTEM"."BusinessUnit" ("code");
CREATE UNIQUE INDEX "businessunit_clusertid_code_u" ON "CARMEN_SYSTEM"."BusinessUnit" ("clusterId", "code");
CREATE UNIQUE INDEX "usertenant_userid_bussinessunitid_u" ON "CARMEN_SYSTEM"."UserBusinessUnit" ("userId", "businessunitId");
CREATE INDEX "notificationpreference_userid_u" ON "CARMEN_SYSTEM"."NotificationPreference" ("userId");
CREATE INDEX "role_name_idx" ON "CARMEN_SYSTEM"."Role" ("name");
CREATE UNIQUE INDEX "role_bussinessunitid_name_u" ON "CARMEN_SYSTEM"."Role" ("bussinessUnitId", "name");
CREATE INDEX "permission_name_u" ON "CARMEN_SYSTEM"."Permission" ("name");
CREATE UNIQUE INDEX "userrole_userid_roleid_u" ON "CARMEN_SYSTEM"."UserRole" ("userId", "roleId");
CREATE UNIQUE INDEX "rolepermission_roleid_permissionid_u" ON "CARMEN_SYSTEM"."RolePermission" ("roleId", "permissionId");
CREATE INDEX "menu_name_u" ON "TENANT_DUMMY"."Menu" ("name");
CREATE INDEX "currency_code_u" ON "TENANT_DUMMY"."Currency" ("code");
CREATE UNIQUE INDEX "exchangerate_dateat_currencyid_u" ON "TENANT_DUMMY"."ExchangeRate" ("dateAt", "currencyId");
CREATE INDEX "location_name_u" ON "TENANT_DUMMY"."Location" ("name");
CREATE INDEX "deliverypoint_name_u" ON "TENANT_DUMMY"."DeliveryPoint" ("name");
CREATE INDEX "unit_name_u" ON "TENANT_DUMMY"."Unit" ("name");
CREATE INDEX "unitconversion_productid_unittype_u" ON "TENANT_DUMMY"."UnitConversion" ("productId", "unitType");
CREATE INDEX "department_name_u" ON "TENANT_DUMMY"."Department" ("name");
CREATE INDEX "product_code_u" ON "TENANT_DUMMY"."Product" ("code");
CREATE INDEX "product_name_u" ON "TENANT_DUMMY"."Product" ("name");
CREATE INDEX "productinfo_productid_u" ON "TENANT_DUMMY"."ProductInfo" ("productId");
CREATE INDEX "productcategory_name_u" ON "TENANT_DUMMY"."ProductCategory" ("name");
CREATE INDEX "productsubcategory_name_u" ON "TENANT_DUMMY"."ProductSubCategory" ("name");
CREATE INDEX "productitemgroup_name_u" ON "TENANT_DUMMY"."ProductItemGroup" ("name");
CREATE INDEX "PRtype_name_u" ON "TENANT_DUMMY"."PRType" ("name");
CREATE INDEX "PR0_refname_u" ON "TENANT_DUMMY"."PR0" ("refName");
CREATE INDEX "PO_name_u" ON "TENANT_DUMMY"."PO0" ("name");
CREATE INDEX "PO1_name_u" ON "TENANT_DUMMY"."PO1" ("name");
CREATE INDEX "vendor_name_u" ON "TENANT_DUMMY"."Vendor" ("name");
CREATE INDEX "contacttype_name_u" ON "TENANT_DUMMY"."ContactType" ("name");
CREATE UNIQUE INDEX "vendorcontact_vendorid_contacttypeid_u" ON "TENANT_DUMMY"."VendorContact" ("vendorId", "contactTypeId");
CREATE INDEX "addresstype_name_u" ON "TENANT_DUMMY"."AddressType" ("name");
CREATE UNIQUE INDEX "vendorcontact_vendorid_addresstypeid_u" ON "TENANT_DUMMY"."VendorAddress" ("vendorId", "addressTypeId");
CREATE UNIQUE INDEX "productvendor_vendorid_productid_u" ON "TENANT_DUMMY"."ProductVendor" ("vendorId", "productId");
CREATE UNIQUE INDEX "inv2_lotname_lotindex_u" ON "TENANT_DUMMY"."INV2" ("lotName", "lotIndex");
ALTER TABLE "CARMEN_SYSTEM"."User"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."User"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Password"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserProfile"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserProfile"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserProfile"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Module"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Module"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnitModule"
ADD FOREIGN KEY ("businessUnitId") REFERENCES "CARMEN_SYSTEM"."BusinessUnit" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnitModule"
ADD FOREIGN KEY ("moduleId") REFERENCES "CARMEN_SYSTEM"."Module" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnitModule"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnitModule"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Subscription"
ADD FOREIGN KEY ("clusterId") REFERENCES "CARMEN_SYSTEM"."Cluster" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Subscription"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Subscription"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."SubscriptionDetail"
ADD FOREIGN KEY ("subscriptionId") REFERENCES "CARMEN_SYSTEM"."Subscription" ("id");
ALTER TABLE "CARMEN_SYSTEM"."SubscriptionDetail"
ADD FOREIGN KEY ("bussinessUnitId") REFERENCES "CARMEN_SYSTEM"."BusinessUnit" ("id");
ALTER TABLE "CARMEN_SYSTEM"."SubscriptionDetail"
ADD FOREIGN KEY ("moduleId") REFERENCES "CARMEN_SYSTEM"."Module" ("id");
ALTER TABLE "CARMEN_SYSTEM"."SubscriptionDetail"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."SubscriptionDetail"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Cluster"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Cluster"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnit"
ADD FOREIGN KEY ("clusterId") REFERENCES "CARMEN_SYSTEM"."Cluster" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnit"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."BusinessUnit"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserBusinessUnit"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserBusinessUnit"
ADD FOREIGN KEY ("businessunitId") REFERENCES "CARMEN_SYSTEM"."BusinessUnit" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserBusinessUnit"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserBusinessUnit"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."NotificationPreference"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."NotificationPreference"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."NotificationPreference"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Notification"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Notification"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Notification"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Role"
ADD FOREIGN KEY ("bussinessUnitId") REFERENCES "CARMEN_SYSTEM"."BusinessUnit" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Role"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Role"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Permission"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."Permission"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserRole"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserRole"
ADD FOREIGN KEY ("roleId") REFERENCES "CARMEN_SYSTEM"."Role" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserRole"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."UserRole"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."RolePermission"
ADD FOREIGN KEY ("roleId") REFERENCES "CARMEN_SYSTEM"."Role" ("id");
ALTER TABLE "CARMEN_SYSTEM"."RolePermission"
ADD FOREIGN KEY ("permissionId") REFERENCES "CARMEN_SYSTEM"."Permission" ("id");
ALTER TABLE "CARMEN_SYSTEM"."RolePermission"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "CARMEN_SYSTEM"."RolePermission"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."User" ("id");
ALTER TABLE "TENANT_DUMMY"."ExchangeRate"
ADD FOREIGN KEY ("currencyId") REFERENCES "TENANT_DUMMY"."Currency" ("id");
ALTER TABLE "TENANT_DUMMY"."Location"
ADD FOREIGN KEY ("deliveryPointId") REFERENCES "TENANT_DUMMY"."DeliveryPoint" ("id");
ALTER TABLE "TENANT_DUMMY"."UnitConversion"
ADD FOREIGN KEY ("productId") REFERENCES "TENANT_DUMMY"."Product" ("id");
ALTER TABLE "TENANT_DUMMY"."UnitConversion"
ADD FOREIGN KEY ("fromUnitId") REFERENCES "TENANT_DUMMY"."Unit" ("id");
ALTER TABLE "TENANT_DUMMY"."UnitConversion"
ADD FOREIGN KEY ("toUnitId") REFERENCES "TENANT_DUMMY"."Unit" ("id");
ALTER TABLE "TENANT_DUMMY"."Product"
ADD FOREIGN KEY ("primaryUnit") REFERENCES "TENANT_DUMMY"."Unit" ("id");
ALTER TABLE "TENANT_DUMMY"."ProductInfo"
ADD FOREIGN KEY ("productId") REFERENCES "TENANT_DUMMY"."Product" ("id");
ALTER TABLE "TENANT_DUMMY"."ProductSubCategory"
ADD FOREIGN KEY ("productCategoryId") REFERENCES "TENANT_DUMMY"."ProductCategory" ("id");
ALTER TABLE "TENANT_DUMMY"."ProductItemGroup"
ADD FOREIGN KEY ("productSubCategoryId") REFERENCES "TENANT_DUMMY"."ProductSubCategory" ("id");
ALTER TABLE "TENANT_DUMMY"."PR0"
ADD FOREIGN KEY ("prTypeId") REFERENCES "TENANT_DUMMY"."PRType" ("id");
ALTER TABLE "TENANT_DUMMY"."PR1"
ADD FOREIGN KEY ("PR0Id") REFERENCES "TENANT_DUMMY"."PR0" ("id");
ALTER TABLE "TENANT_DUMMY"."PR1Workflow"
ADD FOREIGN KEY ("PR1Id") REFERENCES "TENANT_DUMMY"."PR1" ("id");
ALTER TABLE "TENANT_DUMMY"."PO1"
ADD FOREIGN KEY ("PO0Id") REFERENCES "TENANT_DUMMY"."PO0" ("id");
ALTER TABLE "TENANT_DUMMY"."VendorContact"
ADD FOREIGN KEY ("vendorId") REFERENCES "TENANT_DUMMY"."Vendor" ("id");
ALTER TABLE "TENANT_DUMMY"."VendorContact"
ADD FOREIGN KEY ("contactTypeId") REFERENCES "TENANT_DUMMY"."ContactType" ("id");
ALTER TABLE "TENANT_DUMMY"."VendorAddress"
ADD FOREIGN KEY ("vendorId") REFERENCES "TENANT_DUMMY"."Vendor" ("id");
ALTER TABLE "TENANT_DUMMY"."VendorAddress"
ADD FOREIGN KEY ("addressTypeId") REFERENCES "TENANT_DUMMY"."AddressType" ("id");
ALTER TABLE "TENANT_DUMMY"."ProductVendor"
ADD FOREIGN KEY ("vendorId") REFERENCES "TENANT_DUMMY"."Vendor" ("id");
ALTER TABLE "TENANT_DUMMY"."ProductVendor"
ADD FOREIGN KEY ("productId") REFERENCES "TENANT_DUMMY"."Product" ("id");
ALTER TABLE "TENANT_DUMMY"."INV1"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."INV0" ("id");
ALTER TABLE "TENANT_DUMMY"."INV2"
ADD FOREIGN KEY ("inv1Id") REFERENCES "TENANT_DUMMY"."INV1" ("id");
ALTER TABLE "TENANT_DUMMY"."GRN0"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."INV0" ("id");
ALTER TABLE "TENANT_DUMMY"."GRN1"
ADD FOREIGN KEY ("GRN0Id") REFERENCES "TENANT_DUMMY"."GRN0" ("id");
ALTER TABLE "TENANT_DUMMY"."SR0"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."INV0" ("id");
ALTER TABLE "TENANT_DUMMY"."SR1"
ADD FOREIGN KEY ("SR0Id") REFERENCES "TENANT_DUMMY"."SR0" ("id");
ALTER TABLE "TENANT_DUMMY"."SI0"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."INV0" ("id");
ALTER TABLE "TENANT_DUMMY"."SI1"
ADD FOREIGN KEY ("SI0Id") REFERENCES "TENANT_DUMMY"."SI0" ("id");
ALTER TABLE "TENANT_DUMMY"."SO0"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."INV0" ("id");
ALTER TABLE "TENANT_DUMMY"."SO1"
ADD FOREIGN KEY ("SO0Id") REFERENCES "TENANT_DUMMY"."SO0" ("id");