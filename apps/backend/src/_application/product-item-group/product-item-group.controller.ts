import { Controller } from '@nestjs/common';
import { ProductItemGroupService } from './product-item-group.service';

@Controller('product-item-group')
export class ProductItemGroupController {
  constructor(
    private readonly productItemGroupService: ProductItemGroupService,
  ) {}
}
