import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async shouldThrottle(request: any): Promise<boolean> {
    // ตัวอย่างการยกเว้น IP ที่กำหนด
    const clientIp = request.ip;
    const whitelistedIps = ['127.0.0.1', 'YOUR_ALLOWED_IP'];

    if (whitelistedIps.includes(clientIp)) {
      return false;
    }

    return true;
  }
}