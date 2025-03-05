import { Module } from '@nestjs/common';
import { SystemClusterService } from './system-cluster.service';
import { SystemClusterController } from './system-cluster.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { UserModule } from 'src/auth/auth.module';
@Module({
  imports: [PrismaModule, SupabaseModule, UserModule],
  controllers: [SystemClusterController],
  providers: [SystemClusterService],
  exports: [SystemClusterService],
})
export class SystemClusterModule {}
