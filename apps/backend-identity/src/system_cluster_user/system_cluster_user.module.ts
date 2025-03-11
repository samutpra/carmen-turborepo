import { Module } from '@nestjs/common';
import { SystemClusterUserService } from './system_cluster_user.service';
import { SystemClusterUserController } from './system_cluster_user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [SystemClusterUserController],
  providers: [SystemClusterUserService],
})
export class SystemClusterUserModule {}
