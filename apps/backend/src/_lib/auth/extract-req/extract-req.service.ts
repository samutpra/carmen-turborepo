import {
  Injectable,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface ResultHeader {
  user_id: string;
  business_unit_id: string;
}

@Injectable()
export class ExtractReqService {
  constructor(private JwtService: JwtService) {}

  getByReq(req: Request): ResultHeader {
    const access_token = req.headers["authorization"]?.split(" ")[1];
    const decoded = this.JwtService.decode(access_token);

    const user_id = decoded["id"] || null;
    const business_unit_id = req.headers["x-tenant-id"] || "";

    const res: ResultHeader = {
      user_id: user_id,
      business_unit_id: business_unit_id,
    };

    return res;
  }
}
