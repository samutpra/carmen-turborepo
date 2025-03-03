import { Module } from "@nestjs/common";
import { RunningCodeController } from "./running-code.controller";
import { RunningCodeService } from "./running-code.service";

@Module({
  controllers: [RunningCodeController],
  providers: [RunningCodeService],
})
export class RunningCodeModule {}
