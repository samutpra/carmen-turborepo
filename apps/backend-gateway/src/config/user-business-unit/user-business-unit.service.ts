import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class UserBusinessUnitService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/user-business-units/${id}`);
  }

  async setDefaultTenant(userId: string) {
    return await this.buAxios.get(`/user-business-units/default-tenant`);
  }
}
