import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class ProductLocationService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async getLocationsByProductId(productId: string) {
    return await this.buAxios.get(`/product-locations/${productId}`);
  }
}
