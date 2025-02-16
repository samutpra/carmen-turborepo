import { Module } from "@nestjs/common";
import { ClusterUserController } from "./cluster-user.controller";
import { ClusterUserService } from "./cluster-user.service";

@Module({
  controllers: [ClusterUserController],
  providers: [ClusterUserService],
})
export class ClusterUserModule {}
