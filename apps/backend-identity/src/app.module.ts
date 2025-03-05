import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SystemClusterModule } from './system-cluster/system-cluster.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SystemCurrencyIsoModule } from './system_currency_iso/system_currency_iso.module';
import { SystemUsersModule } from './system_users/system_users.module';
import { SystemUserProfileModule } from './system_user_profile/system_user_profile.module';
import { SystemClusterUserModule } from './system_cluster_user/system_cluster_user.module';
import { SystemBusinessUnitsModule } from './system_business_units/system_business_units.module';
import { SystemUserBusinessUnitsModule } from './system_user_business_units/system_user_business_units.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    SystemClusterModule,
    SupabaseModule,
    SystemCurrencyIsoModule,
    SystemUsersModule,
    SystemUserProfileModule,
    SystemClusterUserModule,
    SystemBusinessUnitsModule,
    SystemUserBusinessUnitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
