import { Module } from '@nestjs/common';
import { SystemBusinessUnitsService } from './system_business_units.service';
import { SystemBusinessUnitsController } from './system_business_units.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [SystemBusinessUnitsController],
  providers: [SystemBusinessUnitsService],
})
export class SystemBusinessUnitsModule {}
