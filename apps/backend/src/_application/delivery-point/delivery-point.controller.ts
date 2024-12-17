import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';

import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';

import { DeliveryPointService } from './delivery-point.service';

@Controller("api/v1/delivery-point")
@ApiTags("delivery point")
@ApiBearerAuth()
@ApiHeader({
  name: "x-tenant-id",
  description: "tenant id",
})
@UseGuards(JwtAuthGuard)
export class DeliveryPointController {
  constructor(private readonly deliveryPointService: DeliveryPointService) {}
}
