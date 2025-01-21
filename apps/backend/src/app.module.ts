import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { CreditNoteModule } from './_application/credit-note/credit-note.module';
import { CurrenciesModule } from './_application/currencies/currencies.module';
import { DeliveryPointModule } from './_application/delivery-point/delivery-point.module';
import { DepartmentsModule } from './_application/departments/departments.module';
import { ExchangerateModule } from './_application/exchangerate/exchangerate.module';
import { GoodReceiveNoteModule } from './_application/good-receive-note/good-receive-note.module';
import { LocationsModule } from './_application/locations/locations.module';
import { ProductCategoryModule } from './_application/product-category/product-category.module';
import { ProductItemGroupModule } from './_application/product-item-group/product-item-group.module';
import { ProductSubCategoryModule } from './_application/product-sub-category/product-sub-category.module';
import { ProductsModule } from './_application/products/products.module';
import { PurchaseOrderModule } from './_application/purchase-order/purchase-order.module';
import { PurchaseRequestModule } from './_application/purchase-request/purchase-request.module';
import { StoreRequisitionModule } from './_application/store-requisition/store-requisition.module';
import { UnitsModule } from './_application/units/units.module';
import { UserBusinessUnitModule } from './_application/user-business-unit/user-business-unit.module';
import { UserPermissionModule } from './_application/user-permission/user-permission.module';
import { VendorProductModule } from './_application/vendor-product/vendor-product.module';
import { VendorModule } from './_application/vendors/vendor.module';
import { AuthModule } from './_lib/auth/auth.module';
import { ExtractReqModule } from './_lib/auth/extract-req/extract-req.module';
import { PrismaClientManagerModule } from './_lib/prisma-client-manager/prisma-client-manager.module';
import { SendMailModule } from './_lib/send-mail/send-mail.module';
import { SystemBusinessUnitsModule } from './_system/system-business-units/system-business-unit.module';
import { SystemClusterModule } from './_system/system-cluster/system-cluster.module';
import { SystemUserBusinessUnitModule } from './_system/system-user-business-unit/system-user-business-unit.module';
import { SystemUserProfileModule } from './_system/system-user-profile/system-user-profile.module';
import { SystemUserModule } from './_system/system-users/system-users.module';
import { SystemCurrencyIsoModule } from './_system/system_currency_iso/system_currency_iso.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60, // ระยะเวลาในการรีเซ็ตจำนวนครั้ง (วินาที)
        limit: 10, // จำนวนครั้งที่อนุญาตให้เรียก
      },
    ]),
    SystemUserModule,
    ProductsModule,
    SystemBusinessUnitsModule,
    CurrenciesModule,
    UnitsModule,
    LocationsModule,
    ExchangerateModule,
    AuthModule,
    DepartmentsModule,
    PrismaClientManagerModule,
    PrismaClientManagerModule,
    ExtractReqModule,
    ProductCategoryModule,
    ProductSubCategoryModule,
    ProductItemGroupModule,
    CreditNoteModule,
    GoodReceiveNoteModule,
    PurchaseOrderModule,
    PurchaseRequestModule,
    StoreRequisitionModule,
    VendorModule,
    VendorProductModule,
    SystemClusterModule,
    SendMailModule,
    SystemUserProfileModule,
    SystemUserBusinessUnitModule,
    UserBusinessUnitModule,
    UserPermissionModule,
    DeliveryPointModule,
    SystemCurrencyIsoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
