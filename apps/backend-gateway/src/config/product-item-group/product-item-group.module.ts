import { Module } from '@nestjs/common';
import { ProductItemGroupService } from './product-item-group.service';
import { ProductItemGroupController } from './product-item-group.controller';

@Module({
  controllers: [ProductItemGroupController],
  providers: [ProductItemGroupService],
})
export class ProductItemGroupModule {}
