import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class LocationsService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/locations/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/locations`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/locations`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/locations/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/locations/${id}`);
  }
}
