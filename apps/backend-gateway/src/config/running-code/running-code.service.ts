import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class RunningCodeService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/running-codes/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/running-codes`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/running-codes`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/running-codes/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/running-codes/${id}`);
  }
}
