import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class DepartmentUserService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/department-users/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/department-users`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/department-users`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/department-users/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/department-users/${id}`);
  }
}
