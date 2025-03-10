import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class ProductCategoryService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/product-categories/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/product-categories`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/product-categories`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/product-categories/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/product-categories/${id}`);
  }
}
