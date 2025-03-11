import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';

@Injectable()
export class GoodReceiveNoteService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/good-receive-notes/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/good-receive-notes`);
  }

  async create(createDto: any) {
    return await this.buAxios.post(`/good-receive-notes`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/good-receive-notes/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/good-receive-notes/${id}`);
  }
}
