import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class LocationsUserService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async getLocationByUserId(userId: string) {
    return await this.buAxios.get(`/locations-users/${userId}`);
  }

  async managerLocationUser(userId: string, updateDto: any) {
    return await this.buAxios.get(`/locations-users/manager/${userId}`);
  }
}
