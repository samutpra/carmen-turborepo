import { Module } from '@nestjs/common';

import { ProductItemGroupController } from './product-item-group.controller';
import { ProductItemGroupService } from './product-item-group.service';

@Module({
  controllers: [ProductItemGroupController],
  providers: [ProductItemGroupService],
})
export class ProductItemGroupModule {}
