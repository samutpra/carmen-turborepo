import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './_lib/auth/auth.module';
import { BusinessUnitsModule } from './_system/businessUnits/businessUnit.module';
import { ClusterModule } from './_system/cluster/cluster.module';
import { ConfigModule } from '@nestjs/config';
import { CreditNoteModule } from './_application/credit-note/credit-note.module';
import { CurrenciesModule } from './_application/currencies/currencies.module';
import { DepartmentsModule } from './_application/departments/departments.module';
import { ExchangerateModule } from './_application/exchangerate/exchangerate.module';
import { ExtractReqModule } from './_lib/auth/extract-req/extract-req.module';
import { GoodReceiveNoteModule } from './_application/good-receive-note/good-receive-note.module';
import { LocationsModule } from './_application/locations/locations.module';
import { Module } from '@nestjs/common';
import { PrismaClientManagerModule } from './_lib/prisma-client-manager/prisma-client-manager.module';
import { ProductCategoryModule } from './_application/product-category/product-category.module';
import { ProductItemGroupModule } from './_application/product-item-group/product-item-group.module';
import { ProductSubCategoryModule } from './_application/product-sub-category/product-sub-category.module';
import { ProductsModule } from './_application/products/products.module';
import { PurchaseOrderModule } from './_application/purchase-order/purchase-order.module';
import { PurchaseRequestModule } from './_application/purchase-request/purchase-request.module';
import { StoreRequisitionModule } from './_application/store-requisition/store-requisition.module';
import { UnitsModule } from './_application/units/units.module';
import { UserBussinessUnitModule } from './_system/user-businessUnit/user-bussinessUnit.module';
import { UserModule } from './_system/users/users.module';
import { VendorModule } from './_application/vendors/vendor.module';
import { VendorProductModule } from './_application/vendor-product/vendor-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProductsModule,
    BusinessUnitsModule,
    CurrenciesModule,
    UnitsModule,
    LocationsModule,
    ExchangerateModule,
    AuthModule,
    DepartmentsModule,
    PrismaClientManagerModule,
    PrismaClientManagerModule,
    ExtractReqModule,
    UserBussinessUnitModule,
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
    ClusterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
