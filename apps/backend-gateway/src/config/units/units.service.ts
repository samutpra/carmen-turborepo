import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class UnitsService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/units/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/units`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/units`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/units/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/units/${id}`);
  }
}
