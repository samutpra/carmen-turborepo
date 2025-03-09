import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class UnitCommentService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/unit-comments/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/unit-comments`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/unit-comments`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/unit-comments/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/unit-comments/${id}`);
  }
}
