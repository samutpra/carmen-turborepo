import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DepartmentsService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    return this.httpService.get(
      `${process.env.DEPARTMENTS_SERVICE_URL}/departments/${id}`,
    );
  }

  async findAll() {
    return this.httpService.get(
      `${process.env.DEPARTMENTS_SERVICE_URL}/departments`,
    );
  }

  async create(createDto: any) {
    return this.httpService.post(
      `${process.env.DEPARTMENTS_SERVICE_URL}/departments`,
      createDto,
    );
  }

  async update(id: string, updateDto: any) {
    return this.httpService.put(
      `${process.env.DEPARTMENTS_SERVICE_URL}/departments/${id}`,
      updateDto,
    );
  }

  async delete(id: string) {
    return this.httpService.delete(
      `${process.env.DEPARTMENTS_SERVICE_URL}/departments/${id}`,
    );
  }
}
