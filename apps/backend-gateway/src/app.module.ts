import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { CreditNoteModule } from './application/credit-note/credit-note.module';
import { CurrenciesModule } from './config/currencies/currencies.module';
import { DeliveryPointModule } from './config/delivery-point/delivery-point.module';
import { DepartmentsModule } from './config/departments/departments.module';
import { LocationProductModule } from './config/location-product/location-product.module';
import { LocationsModule } from './config/locations/locations.module';
import { ExchangeRateModule } from './config/exchange-rate/exchange-rate.module';
import { GoodReceiveNoteModule } from './config/good-receive-note/good-receive-note.module';
import { ProductCategoryModule } from './config/product-category/product-category.module';
import { ProductItemGroupModule } from './config/product-item-group/product-item-group.module';
import { ProductLocationModule } from './config/product-location/product-location.module';
import { ProductSubCategoryModule } from './config/product-sub-category/product-sub-category.module';
import { ProductsModule } from './config/products/products.module';
import { PurchaseOrderModule } from './config/purchase-order/purchase-order.module';
import { PurchaseRequestModule } from './config/purchase-request/purchase-request.module';
import { RunningCodeModule } from './config/running-code/running-code.module';
import { StoreRequisitionModule } from './config/store-requisition/store-requisition.module';
import { UnitsModule } from './config/units/units.module';
import { UserBusinessUnitModule } from './config/user-business-unit/user-business-unit.module';
import { UserLocationModule } from './config/user-location/user-location.module';
import { VendorsModule } from './config/vendors/vendors.module';
import { WorkflowsModule } from './config/workflows/workflows.module';
import { DepartmentUserModule } from './config/department-user/department-user.module';
import { UnitCommentModule } from './application/unit-comment/unit-comment.module';
import { LocationsUserModule } from './config/locations-user/locations-user.module';
import { VendorProductModule } from './application/vendor-product/vendor-product.module';

@Module({
  imports: [
    AuthModule,
    DepartmentUserModule,
    UnitCommentModule,
    LocationsUserModule,
    VendorProductModule,
    CreditNoteModule,
    CurrenciesModule,
    DeliveryPointModule,
    DepartmentsModule,
    ExchangeRateModule,
    GoodReceiveNoteModule,
    LocationProductModule,
    LocationsModule,
    ProductCategoryModule,
    ProductItemGroupModule,
    ProductLocationModule,
    ProductSubCategoryModule,
    ProductsModule,
    PurchaseOrderModule,
    PurchaseRequestModule,
    RunningCodeModule,
    StoreRequisitionModule,
    UnitsModule,
    UserBusinessUnitModule,
    UserLocationModule,
    VendorsModule,
    WorkflowsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
