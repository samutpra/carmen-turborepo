import { Module } from '@nestjs/common';

import { StoreRequisitionController } from './store-requisition.controller';
import { StoreRequisitionService } from './store-requisition.service';

@Module({
  controllers: [StoreRequisitionController],
  providers: [StoreRequisitionService],
})
export class StoreRequisitionModule {}
