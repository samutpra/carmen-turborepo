import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './_lib/auth/auth.module';
import { BusinessUnitsModule } from './_system/businessUnits/businessUnit.module';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesModule } from './_application/currencies/currencies.module';
import { DepartmentsModule } from './_application/departments/departments.module';
import { ExchangerateModule } from './_application/exchangerate/exchangerate.module';
import { ExtractReqModule } from './_lib/auth/extract-req/extract-req.module';
import { LocationsModule } from './_application/locations/locations.module';
import { Module } from '@nestjs/common';
import { PrismaClientManagerModule } from './_lib/prisma-client-manager/prisma-client-manager.module';
import { ProductCategoryModule } from './_application/product-category/product-category.module';
import { ProductItemGroupModule } from './_application/product-item-group/product-item-group.module';
import { ProductSubCategoryModule } from './_application/product-sub-category/product-sub-category.module';
import { ProductsModule } from './_application/products/products.module';
import { UnitsModule } from './_application/units/units.module';
import { UserBussinessUnitModule } from './_system/user-businessUnit/user-bussinessUnit.module';
import { UserModule } from './_system/users/users.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
