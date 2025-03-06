import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    return this.httpService.get(
      `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
    );
  }

  async findAll() {
    return this.httpService.get(`${process.env.PRODUCTS_SERVICE_URL}/products`);
  }

  async getProductByItemsGroup(id: string) {
    return this.httpService.get(
      `${process.env.PRODUCTS_SERVICE_URL}/products/by-item-group-id/${id}`,
    );
  }

  async getOrderUnitByProductId(id: string) {
    return this.httpService.get(
      `${process.env.PRODUCTS_SERVICE_URL}/products/order-unit/${id}`,
    );
  }

  async getRecipeUnitByProductId(id: string) {
    return this.httpService.get(
      `${process.env.PRODUCTS_SERVICE_URL}/products/recipe-unit/${id}`,
    );
  }

  async create(createDto: any) {
    return this.httpService.post(
      `${process.env.PRODUCTS_SERVICE_URL}/products`,
      createDto,
    );
  }

  async update(id: string, updateDto: any) {
    return this.httpService.put(
      `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
      updateDto,
    );
  }

  async delete(id: string) {
    return this.httpService.delete(
      `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
    );
  }
}
