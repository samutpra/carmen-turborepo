import { Module } from '@nestjs/common';
import { SystemUserProfileService } from './system_user_profile.service';
import { SystemUserProfileController } from './system_user_profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [SystemUserProfileController],
  providers: [SystemUserProfileService],
})
export class SystemUserProfileModule {}
