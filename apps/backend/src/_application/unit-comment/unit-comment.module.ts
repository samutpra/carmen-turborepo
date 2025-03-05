import { Module } from '@nestjs/common';
import { UnitCommentController } from './unit-comment.controller';
import { UnitCommentService } from './unit-comment.service';

@Module({
  controllers: [UnitCommentController],
  providers: [UnitCommentService],
  exports: [UnitCommentService],
})
export class UnitCommentModule {}
