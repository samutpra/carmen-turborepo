import { Module } from '@nestjs/common';
import { RunningCodeService } from './running-code.service';
import { RunningCodeController } from './running-code.controller';

@Module({
  controllers: [RunningCodeController],
  providers: [RunningCodeService],
})
export class RunningCodeModule {}
