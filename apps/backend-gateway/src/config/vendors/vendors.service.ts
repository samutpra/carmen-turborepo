import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class VendorsService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/vendors/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/vendors`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/vendors`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/vendors/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/vendors/${id}`);
  }
}
