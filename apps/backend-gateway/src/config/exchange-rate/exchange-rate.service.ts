import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ExchangeRateService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    return this.httpService.get(
      `${process.env.EXCHANGE_RATE_SERVICE_URL}/exchange-rate/${id}`,
    );
  }

  async findAll() {
    return this.httpService.get(
      `${process.env.EXCHANGE_RATE_SERVICE_URL}/exchange-rate`,
    );
  }

  async create(createDto: any) {
    return this.httpService.post(
      `${process.env.EXCHANGE_RATE_SERVICE_URL}/exchange-rate`,
      createDto,
    );
  }

  async update(id: string, updateDto: any) {
    return this.httpService.put(
      `${process.env.EXCHANGE_RATE_SERVICE_URL}/exchange-rate/${id}`,
      updateDto,
    );
  }

  async delete(id: string) {
    return this.httpService.delete(
      `${process.env.EXCHANGE_RATE_SERVICE_URL}/exchange-rate/${id}`,
    );
  }
}
