import { Controller } from '@nestjs/common';
import { StoreRequisitionService } from './store-requisition.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/store-requisition')
@ApiTags('Config - Store Requisition')
export class StoreRequisitionController {
  constructor(
    private readonly storeRequisitionService: StoreRequisitionService,
  ) {}
}
