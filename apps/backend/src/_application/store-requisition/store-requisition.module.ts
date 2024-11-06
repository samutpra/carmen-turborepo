import { Module } from '@nestjs/common';
import { StoreRequisitionService } from './store-requisition.service';
import { StoreRequisitionController } from './store-requisition.controller';

@Module({
  controllers: [StoreRequisitionController],
  providers: [StoreRequisitionService],
})
export class StoreRequisitionModule {}
