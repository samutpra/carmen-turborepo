import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SystemClusterModule } from './system-cluster/system-cluster.module';

@Module({
  imports: [UserModule, PrismaModule, SystemClusterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
