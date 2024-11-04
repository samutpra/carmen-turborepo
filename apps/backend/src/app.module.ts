import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './_lib/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesModule } from './_application/currencies/currencies.module';
import { DepartmentsModule } from './_application/departments/departments.module';
import { ExchangerateModule } from './_application/exchangerate/exchangerate.module';
import { ExtractReqModule } from './_lib/auth/extract-req/extract-req.module';
import { Module } from '@nestjs/common';
import { PrismaClientManagerModule } from './_lib/prisma-client-manager/prisma-client-manager.module';
import { ProductsModule } from './_application/products/products.module';
import { StoreLocationsModule } from './_application/storelocations/storelocations.module';
import { TenantsModule } from './_system/tenants/tenants.module';
import { UnitsModule } from './_application/units/units.module';
import { UserModule } from './_system/users/users.module';
import { UserTenantModule } from './_system/user-tenant/user-tenant.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    TenantsModule,
    CurrenciesModule,
    UnitsModule,
    StoreLocationsModule,
    ExchangerateModule,
    AuthModule,
    DepartmentsModule,
    PrismaClientManagerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaClientManagerModule,
    ExtractReqModule,
    UserTenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
