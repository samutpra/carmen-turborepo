import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class CurrenciesService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/currencies/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/currencies`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/currencies`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/currencies/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/currencies/${id}`);
  }
}
