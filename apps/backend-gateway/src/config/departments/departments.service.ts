import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class DepartmentsService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/departments/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/departments`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/departments`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/departments/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/departments/${id}`);
  }
}
