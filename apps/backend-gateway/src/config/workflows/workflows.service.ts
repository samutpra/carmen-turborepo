import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class WorkflowsService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/workflows/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/workflows`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/workflows`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/workflows/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/workflows/${id}`);
  }
}
