import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class ExchangeRateService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/exchange-rate/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/exchange-rate`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/exchange-rate`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/exchange-rate/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/exchange-rate/${id}`);
  }
}
