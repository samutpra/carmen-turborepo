import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    return this.httpService.get(
      `${process.env.CURRENCIES_SERVICE_URL}/currencies/${id}`,
    );
  }

  async findAll() {
    return this.httpService.get(
      `${process.env.CURRENCIES_SERVICE_URL}/currencies`,
    );
  }

  async create(createDto: any) {
    return this.httpService.post(
      `${process.env.CURRENCIES_SERVICE_URL}/currencies`,
      createDto,
    );
  }

  async update(id: string, updateDto: any) {
    return this.httpService.put(
      `${process.env.CURRENCIES_SERVICE_URL}/currencies/${id}`,
      updateDto,
    );
  }

  async delete(id: string) {
    return this.httpService.delete(
      `${process.env.CURRENCIES_SERVICE_URL}/currencies/${id}`,
    );
  }
}
