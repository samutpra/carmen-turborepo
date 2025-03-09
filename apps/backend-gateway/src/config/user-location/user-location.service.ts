import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class UserLocationService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async getUsersByLocationId(locationId: string) {
    return await this.buAxios.get(`/user-locations/${locationId}`);
  }

  async managerUserLocation(locationId: string, updateDto: any) {
    return await this.buAxios.get(`/user-locations/manager/${locationId}`);
  }
}
