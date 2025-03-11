import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class ProductsService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/products/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/products`);
  }

  async getProductByItemsGroup(id: string) {
    return await this.buAxios.get(`/products/by-item-group-id/${id}`);
  }

  async getOrderUnitByProductId(id: string) {
    return await this.buAxios.get(`/products/order-unit/${id}`);
  }

  async getIngredientUnitByProductId(id: string) {
    return await this.buAxios.get(`/products/ingredient-unit/${id}`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/products`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/products/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/products/${id}`);
  }
}
