import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class LocationProductService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async getProductByLocationId(locationId: string) {
    return await this.buAxios.get(`/location-products/${locationId}`);
  }
}
