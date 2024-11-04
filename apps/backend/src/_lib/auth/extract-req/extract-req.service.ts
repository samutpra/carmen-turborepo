import { Injectable, Request } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

export interface ResultHeader {
  userId: string;
  tenantId: string;
}

@Injectable()
export class ExtractReqService {
  constructor(private JwtService: JwtService) {}

  getByReq(req: Request): ResultHeader {
    const access_token = req.headers['authorization']?.split(' ')[1];
    const decoded = this.JwtService.decode(access_token);

    const userId = decoded['id'] || null;
    const tenantId = req.headers['x-tenant-id'] || '';

    const res: ResultHeader = {
      userId: userId,
      tenantId: tenantId,
    };

    return res;
  }
}
