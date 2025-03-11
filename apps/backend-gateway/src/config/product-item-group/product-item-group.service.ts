import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class ProductItemGroupService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/product-item-groups/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/product-item-groups`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/product-item-groups`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/product-item-groups/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/product-item-groups/${id}`);
  }
}
