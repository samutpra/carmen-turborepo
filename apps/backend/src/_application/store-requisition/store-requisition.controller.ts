import { Controller } from '@nestjs/common';

import { StoreRequisitionService } from './store-requisition.service';

@Controller("store-requisition")
export class StoreRequisitionController {
  constructor(
    private readonly storeRequisitionService: StoreRequisitionService,
  ) {}
}
