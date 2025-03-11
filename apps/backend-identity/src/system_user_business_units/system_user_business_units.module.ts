import { Module } from '@nestjs/common';
import { SystemUserBusinessUnitsService } from './system_user_business_units.service';
import { SystemUserBusinessUnitsController } from './system_user_business_units.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [SystemUserBusinessUnitsController],
  providers: [SystemUserBusinessUnitsService],
})
export class SystemUserBusinessUnitsModule {}
