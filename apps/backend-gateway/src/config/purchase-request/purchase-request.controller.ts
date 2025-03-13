import { Controller } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/purchase-request')
@ApiTags('Purchase Request')
export class PurchaseRequestController {
  constructor(
    private readonly purchaseRequestService: PurchaseRequestService,
  ) {}
}
