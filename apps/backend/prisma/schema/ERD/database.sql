CREATE SCHEMA "CARMEN_SYSTEM";
CREATE SCHEMA "TENANT_DUMMY";
CREATE TYPE "CARMEN_SYSTEM"."enum_subscription_status" AS ENUM ('Active', 'Inactive', 'expired');
CREATE TYPE "TENANT_DUMMY"."enum_activity_action" AS ENUM (
  'read',
  'create',
  'update',
  'delete',
  'login',
  'other'
);
CREATE TYPE "TENANT_DUMMY"."enum_location_type" AS ENUM ('Inventory', 'Direct', 'Consignment');
CREATE TYPE "TENANT_DUMMY"."enum_unit_type" AS ENUM (
  'OrderUnit',
  'InventoryUnit',
  'RecipeUnit'
);
CREATE TYPE "TENANT_DUMMY"."enum_purchase_request_doc_status" AS ENUM ('Draft', 'WIP', 'Complete');
CREATE TYPE "TENANT_DUMMY"."enum_purchase_request_workflow_status" AS ENUM ('Draft', 'Pending', 'Review', 'Accept');
CREATE TYPE "TENANT_DUMMY"."enum_purchase_order_status" AS ENUM (
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
CREATE TYPE "TENANT_DUMMY"."enum_inventory_doc_type" AS ENUM (
  'GRN',
  'CN',
  'SR',
  'ISSUE',
  'ADJ',
  'SI',
  'SO'
);
CREATE TABLE "CARMEN_SYSTEM"."user_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "username" varchar(30) UNIQUE NOT NULL,
  "email" varchar(255) NOT NULL,
  "consent" timestamp,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."password_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid NOT NULL,
  "hash" text NOT NULL,
  "isActive" bool DEFAULT false,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP)
);
CREATE TABLE "CARMEN_SYSTEM"."user_profile_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."module_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."business_unit_module_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "businessUnitId" uuid NOT NULL,
  "moduleId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."subscription_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "clusterId" uuid NOT NULL,
  "startDate" date NOT NULL,
  "endDate" date NOT NULL,
  "status" "CARMEN_SYSTEM"."enum_subscription_status" NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."subscription_detail_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "subscriptionId" uuid NOT NULL,
  "bussinessUnitId" uuid NOT NULL,
  "moduleId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."cluster_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "code" varchar(30) UNIQUE NOT NULL,
  "name" text UNIQUE NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."business_unit_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."user_business_unit_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid,
  "businessunitId" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."notification_preference_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."notification_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid NOT NULL,
  "message" text,
  "isRead" bool DEFAULT false,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."role_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "bussinessUnitId" uuid NOT NULL,
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."permission_table" (
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
CREATE TABLE "CARMEN_SYSTEM"."user_role_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "userId" uuid NOT NULL,
  "roleId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "CARMEN_SYSTEM"."role_permission_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "roleId" uuid NOT NULL,
  "permissionId" uuid NOT NULL,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."global_activity_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "action" "TENANT_DUMMY"."enum_activity_action",
  "entityType" varchar(100),
  "entityId" uuid,
  "actorId" uuid,
  "metadata" Json,
  "oldData" JSON,
  "newData" json,
  "ipAddress" text,
  "userAgent" text,
  "description" text,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid
);
CREATE TABLE "TENANT_DUMMY"."menu_table" (
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
CREATE TABLE "TENANT_DUMMY"."currency_table" (
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
CREATE TABLE "TENANT_DUMMY"."exchange_rate_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "dateAt" timestamp DEFAULT (now()),
  "currencyId" uuid,
  "rate" float DEFAULT 1,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."location_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "locationType" "TENANT_DUMMY"."enum_location_type" NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "deliveryPointId" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."delivery_point_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."unit_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."unit_conversion_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "productId" uuid,
  "unitType" "TENANT_DUMMY"."enum_unit_type" NOT NULL,
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
CREATE TABLE "TENANT_DUMMY"."department_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_table" (
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
CREATE TABLE "TENANT_DUMMY"."product_info_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "productId" uuid UNIQUE NOT NULL,
  "price" Float,
  "info" json,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_category_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."product_sub_category_table" (
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
CREATE TABLE "TENANT_DUMMY"."product_item_group_table" (
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
CREATE TABLE "TENANT_DUMMY"."purchase_request_type_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_request_0_table" (
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
CREATE TABLE "TENANT_DUMMY"."purchase_request_1_table" (
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
CREATE TABLE "TENANT_DUMMY"."purchase_request_1_workflow_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "PR1Id" uuid,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_order_0_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."purchase_order_1_table" (
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
CREATE TABLE "TENANT_DUMMY"."vendor_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."contact_type_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" uuid UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."vendor_contact_table" (
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
CREATE TABLE "TENANT_DUMMY"."address_type_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" uuid UNIQUE NOT NULL,
  "description" text,
  "isActive" bool DEFAULT true,
  "createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "createById" uuid,
  "updateAt" timestamp DEFAULT (CURRENT_TIMESTAMP),
  "updateById" uuid
);
CREATE TABLE "TENANT_DUMMY"."vendor_address_table" (
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
CREATE TABLE "TENANT_DUMMY"."product_vendor_table" (
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
CREATE TABLE "TENANT_DUMMY"."inventory_transaction_0_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar UNIQUE NOT NULL,
  "invDocType" "TENANT_DUMMY"."enum_inventory_doc_type"
);
CREATE TABLE "TENANT_DUMMY"."inventory_transaction_1_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "fromLot" uuid,
  "currentLotName" varchar,
  "qty" decimal,
  "cost" numeric(15, 5)
);
CREATE TABLE "TENANT_DUMMY"."inventory_transaction_2_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv1Id" uuid NOT NULL,
  "lotName" varchar,
  "lotIndex" integer NOT NULL DEFAULT 1,
  "qty" decimal,
  "cost" numeric(15, 5)
);
CREATE TABLE "TENANT_DUMMY"."good_receive_note_0_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."good_receive_note_1_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "GRN0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."store_requisition_0_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."store_requisition_1_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "SR0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."stock_in_0_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."stock_in_1_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "SI0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."stock_out_0_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "inv0Id" uuid NOT NULL,
  "name" varchar
);
CREATE TABLE "TENANT_DUMMY"."stock_out_1_table" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "SO0Id" uuid NOT NULL,
  "name" varchar
);
CREATE INDEX "user_username_idx" ON "CARMEN_SYSTEM"."user_table" ("username");
CREATE INDEX "user_email_idx" ON "CARMEN_SYSTEM"."user_table" ("email");
CREATE INDEX "password_userid_idx" ON "CARMEN_SYSTEM"."password_table" ("userId");
CREATE INDEX "userprofile_userid_idx" ON "CARMEN_SYSTEM"."user_profile_table" ("userId");
CREATE INDEX "userprofile_firstname_lastname_idx" ON "CARMEN_SYSTEM"."user_profile_table" ("firstname", "lastname");
CREATE INDEX "module_name_idx" ON "CARMEN_SYSTEM"."module_table" ("name");
CREATE INDEX "businessunitmodule_businessunitid_moduleid_u" ON "CARMEN_SYSTEM"."business_unit_module_table" ("businessUnitId", "moduleId");
CREATE UNIQUE INDEX "subscriptiondetail_subscriptionid_businessunitid_moduleid_u" ON "CARMEN_SYSTEM"."subscription_detail_table" ("subscriptionId", "bussinessUnitId", "moduleId");
CREATE UNIQUE INDEX "cluster_code_u" ON "CARMEN_SYSTEM"."cluster_table" ("code");
CREATE UNIQUE INDEX "cluster_name_u" ON "CARMEN_SYSTEM"."cluster_table" ("name");
CREATE INDEX "tenant_clusertid_idx" ON "CARMEN_SYSTEM"."business_unit_table" ("clusterId");
CREATE INDEX "businessunit_code_idx" ON "CARMEN_SYSTEM"."business_unit_table" ("code");
CREATE UNIQUE INDEX "businessunit_clusertid_code_u" ON "CARMEN_SYSTEM"."business_unit_table" ("clusterId", "code");
CREATE UNIQUE INDEX "usertenant_userid_bussinessunitid_u" ON "CARMEN_SYSTEM"."user_business_unit_table" ("userId", "businessunitId");
CREATE INDEX "notificationpreference_userid_u" ON "CARMEN_SYSTEM"."notification_preference_table" ("userId");
CREATE INDEX "role_name_idx" ON "CARMEN_SYSTEM"."role_table" ("name");
CREATE UNIQUE INDEX "role_bussinessunitid_name_u" ON "CARMEN_SYSTEM"."role_table" ("bussinessUnitId", "name");
CREATE INDEX "permission_name_u" ON "CARMEN_SYSTEM"."permission_table" ("name");
CREATE UNIQUE INDEX "userrole_userid_roleid_u" ON "CARMEN_SYSTEM"."user_role_table" ("userId", "roleId");
CREATE UNIQUE INDEX "rolepermission_roleid_permissionid_u" ON "CARMEN_SYSTEM"."role_permission_table" ("roleId", "permissionId");
CREATE INDEX "global_activity_entitytype_entityid_idx" ON "TENANT_DUMMY"."global_activity_table" ("entityType", "entityId");
CREATE INDEX ON "TENANT_DUMMY"."global_activity_table" ("actorId");
CREATE INDEX ON "TENANT_DUMMY"."global_activity_table" ("action");
CREATE INDEX ON "TENANT_DUMMY"."global_activity_table" ("createdAt");
CREATE INDEX "menu_name_u" ON "TENANT_DUMMY"."menu_table" ("name");
CREATE INDEX "currency_code_u" ON "TENANT_DUMMY"."currency_table" ("code");
CREATE UNIQUE INDEX "exchangerate_dateat_currencyid_u" ON "TENANT_DUMMY"."exchange_rate_table" ("dateAt", "currencyId");
CREATE INDEX "location_name_u" ON "TENANT_DUMMY"."location_table" ("name");
CREATE INDEX "deliverypoint_name_u" ON "TENANT_DUMMY"."delivery_point_table" ("name");
CREATE INDEX "unit_name_u" ON "TENANT_DUMMY"."unit_table" ("name");
CREATE INDEX "unitconversion_productid_unittype_u" ON "TENANT_DUMMY"."unit_conversion_table" ("productId", "unitType");
CREATE INDEX "department_name_u" ON "TENANT_DUMMY"."department_table" ("name");
CREATE INDEX "product_code_u" ON "TENANT_DUMMY"."product_table" ("code");
CREATE INDEX "product_name_u" ON "TENANT_DUMMY"."product_table" ("name");
CREATE INDEX "productinfo_productid_u" ON "TENANT_DUMMY"."product_info_table" ("productId");
CREATE INDEX "productcategory_name_u" ON "TENANT_DUMMY"."product_category_table" ("name");
CREATE INDEX "productsubcategory_name_u" ON "TENANT_DUMMY"."product_sub_category_table" ("name");
CREATE INDEX "productitemgroup_name_u" ON "TENANT_DUMMY"."product_item_group_table" ("name");
CREATE INDEX "PRtype_name_u" ON "TENANT_DUMMY"."purchase_request_type_table" ("name");
CREATE INDEX "PR0_refname_u" ON "TENANT_DUMMY"."purchase_request_0_table" ("refName");
CREATE INDEX "PO_name_u" ON "TENANT_DUMMY"."purchase_order_0_table" ("name");
CREATE INDEX "PO1_name_u" ON "TENANT_DUMMY"."purchase_order_1_table" ("name");
CREATE INDEX "vendor_name_u" ON "TENANT_DUMMY"."vendor_table" ("name");
CREATE INDEX "contacttype_name_u" ON "TENANT_DUMMY"."contact_type_table" ("name");
CREATE UNIQUE INDEX "vendorcontact_vendorid_contacttypeid_u" ON "TENANT_DUMMY"."vendor_contact_table" ("vendorId", "contactTypeId");
CREATE INDEX "addresstype_name_u" ON "TENANT_DUMMY"."address_type_table" ("name");
CREATE UNIQUE INDEX "vendorcontact_vendorid_addresstypeid_u" ON "TENANT_DUMMY"."vendor_address_table" ("vendorId", "addressTypeId");
CREATE UNIQUE INDEX "productvendor_vendorid_productid_u" ON "TENANT_DUMMY"."product_vendor_table" ("vendorId", "productId");
CREATE UNIQUE INDEX "inv2_lotname_lotindex_u" ON "TENANT_DUMMY"."inventory_transaction_2_table" ("lotName", "lotIndex");
ALTER TABLE "CARMEN_SYSTEM"."user_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."password_table"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_profile_table"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_profile_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_profile_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."module_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."module_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("businessUnitId") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("moduleId") REFERENCES "CARMEN_SYSTEM"."module_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_module_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_table"
ADD FOREIGN KEY ("clusterId") REFERENCES "CARMEN_SYSTEM"."cluster_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("subscriptionId") REFERENCES "CARMEN_SYSTEM"."subscription_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("bussinessUnitId") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("moduleId") REFERENCES "CARMEN_SYSTEM"."module_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."subscription_detail_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."cluster_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."cluster_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_table"
ADD FOREIGN KEY ("clusterId") REFERENCES "CARMEN_SYSTEM"."cluster_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."business_unit_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("businessunitId") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_business_unit_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_preference_table"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_preference_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_preference_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_table"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."notification_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_table"
ADD FOREIGN KEY ("bussinessUnitId") REFERENCES "CARMEN_SYSTEM"."business_unit_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."permission_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."permission_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("userId") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("roleId") REFERENCES "CARMEN_SYSTEM"."role_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."user_role_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("roleId") REFERENCES "CARMEN_SYSTEM"."role_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("permissionId") REFERENCES "CARMEN_SYSTEM"."permission_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("createById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "CARMEN_SYSTEM"."role_permission_table"
ADD FOREIGN KEY ("updateById") REFERENCES "CARMEN_SYSTEM"."user_table" ("id");
ALTER TABLE "TENANT_DUMMY"."exchange_rate_table"
ADD FOREIGN KEY ("currencyId") REFERENCES "TENANT_DUMMY"."currency_table" ("id");
ALTER TABLE "TENANT_DUMMY"."location_table"
ADD FOREIGN KEY ("deliveryPointId") REFERENCES "TENANT_DUMMY"."delivery_point_table" ("id");
ALTER TABLE "TENANT_DUMMY"."unit_conversion_table"
ADD FOREIGN KEY ("productId") REFERENCES "TENANT_DUMMY"."product_table" ("id");
ALTER TABLE "TENANT_DUMMY"."unit_conversion_table"
ADD FOREIGN KEY ("fromUnitId") REFERENCES "TENANT_DUMMY"."unit_table" ("id");
ALTER TABLE "TENANT_DUMMY"."unit_conversion_table"
ADD FOREIGN KEY ("toUnitId") REFERENCES "TENANT_DUMMY"."unit_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_table"
ADD FOREIGN KEY ("primaryUnit") REFERENCES "TENANT_DUMMY"."unit_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_info_table"
ADD FOREIGN KEY ("productId") REFERENCES "TENANT_DUMMY"."product_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_sub_category_table"
ADD FOREIGN KEY ("productCategoryId") REFERENCES "TENANT_DUMMY"."product_category_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_item_group_table"
ADD FOREIGN KEY ("productSubCategoryId") REFERENCES "TENANT_DUMMY"."product_sub_category_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_request_0_table"
ADD FOREIGN KEY ("prTypeId") REFERENCES "TENANT_DUMMY"."purchase_request_type_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_request_1_table"
ADD FOREIGN KEY ("PR0Id") REFERENCES "TENANT_DUMMY"."purchase_request_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_request_1_workflow_table"
ADD FOREIGN KEY ("PR1Id") REFERENCES "TENANT_DUMMY"."purchase_request_1_table" ("id");
ALTER TABLE "TENANT_DUMMY"."purchase_order_1_table"
ADD FOREIGN KEY ("PO0Id") REFERENCES "TENANT_DUMMY"."purchase_order_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_contact_table"
ADD FOREIGN KEY ("vendorId") REFERENCES "TENANT_DUMMY"."vendor_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_contact_table"
ADD FOREIGN KEY ("contactTypeId") REFERENCES "TENANT_DUMMY"."contact_type_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_address_table"
ADD FOREIGN KEY ("vendorId") REFERENCES "TENANT_DUMMY"."vendor_table" ("id");
ALTER TABLE "TENANT_DUMMY"."vendor_address_table"
ADD FOREIGN KEY ("addressTypeId") REFERENCES "TENANT_DUMMY"."address_type_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_vendor_table"
ADD FOREIGN KEY ("vendorId") REFERENCES "TENANT_DUMMY"."vendor_table" ("id");
ALTER TABLE "TENANT_DUMMY"."product_vendor_table"
ADD FOREIGN KEY ("productId") REFERENCES "TENANT_DUMMY"."product_table" ("id");
ALTER TABLE "TENANT_DUMMY"."inventory_transaction_1_table"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."inventory_transaction_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."inventory_transaction_2_table"
ADD FOREIGN KEY ("inv1Id") REFERENCES "TENANT_DUMMY"."inventory_transaction_1_table" ("id");
ALTER TABLE "TENANT_DUMMY"."good_receive_note_0_table"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."inventory_transaction_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."good_receive_note_1_table"
ADD FOREIGN KEY ("GRN0Id") REFERENCES "TENANT_DUMMY"."good_receive_note_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."store_requisition_0_table"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."inventory_transaction_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."store_requisition_1_table"
ADD FOREIGN KEY ("SR0Id") REFERENCES "TENANT_DUMMY"."store_requisition_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_in_0_table"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."inventory_transaction_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_in_1_table"
ADD FOREIGN KEY ("SI0Id") REFERENCES "TENANT_DUMMY"."stock_in_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_out_0_table"
ADD FOREIGN KEY ("inv0Id") REFERENCES "TENANT_DUMMY"."inventory_transaction_0_table" ("id");
ALTER TABLE "TENANT_DUMMY"."stock_out_1_table"
ADD FOREIGN KEY ("SO0Id") REFERENCES "TENANT_DUMMY"."stock_out_0_table" ("id");