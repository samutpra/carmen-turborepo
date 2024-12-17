import { Global, Module } from '@nestjs/common';

import { PrismaClientManagerService } from './prisma-client-manager.service';

@Global()
@Module({
  providers: [PrismaClientManagerService],
  exports: [PrismaClientManagerService],
})
export class PrismaClientManagerModule {}
