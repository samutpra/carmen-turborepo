import { Module } from '@nestjs/common';
import { UnitCommentService } from './unit-comment.service';
import { UnitCommentController } from './unit-comment.controller';

@Module({
  controllers: [UnitCommentController],
  providers: [UnitCommentService],
})
export class UnitCommentModule {}
