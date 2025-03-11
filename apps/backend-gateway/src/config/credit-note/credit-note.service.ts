import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { buAxios } from 'src/common/helpers/requests/axios.helper';
import { ICreditNoteCreate } from './dto/credit-note.dto';

@Injectable()
export class CreditNoteService {
  private buAxios: AxiosInstance;
  constructor() {
    this.buAxios = buAxios();
  }

  async findOne(id: string) {
    return await this.buAxios.get(`/credit-notes/${id}`);
  }

  async findAll() {
    return await this.buAxios.get(`/credit-notes`);
  }

  async create(createDto: ICreditNoteCreate) {
    return await this.buAxios.post(`/credit-notes`, createDto);
  }

  async update(id: string, updateDto: any) {
    return await this.buAxios.put(`/credit-notes/${id}`, updateDto);
  }

  async delete(id: string) {
    return await this.buAxios.delete(`/credit-notes/${id}`);
  }
}
