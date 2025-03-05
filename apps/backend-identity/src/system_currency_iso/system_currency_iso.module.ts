import { Module } from '@nestjs/common';
import { SystemCurrencyIsoService } from './system_currency_iso.service';
import { SystemCurrencyIsoController } from './system_currency_iso.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [SystemCurrencyIsoController],
  providers: [SystemCurrencyIsoService],
  exports: [SystemCurrencyIsoService],
})
export class SystemCurrencyIsoModule {}
