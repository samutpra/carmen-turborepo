import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class DeliveryPointService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/delivery-points/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/delivery-points`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/delivery-points`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/delivery-points/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/delivery-points/${id}`);
  }
}
