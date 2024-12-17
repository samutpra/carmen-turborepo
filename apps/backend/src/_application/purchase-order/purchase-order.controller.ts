import { Controller } from '@nestjs/common';

import { PurchaseOrderService } from './purchase-order.service';

@Controller("purchase-order")
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}
}
