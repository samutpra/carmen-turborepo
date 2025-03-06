import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LocationsService {
  constructor(private readonly httpService: HttpService) {}

  async findOne(id: string) {
    return this.httpService.get(
      `${process.env.LOCATIONS_SERVICE_URL}/locations/${id}`,
    );
  }

  async findAll() {
    return this.httpService.get(
      `${process.env.LOCATIONS_SERVICE_URL}/locations`,
    );
  }

  async create(createDto: any) {
    return this.httpService.post(
      `${process.env.LOCATIONS_SERVICE_URL}/locations`,
      createDto,
    );
  }

  async update(id: string, updateDto: any) {
    return this.httpService.put(
      `${process.env.LOCATIONS_SERVICE_URL}/locations/${id}`,
      updateDto,
    );
  }

  async delete(id: string) {
    return this.httpService.delete(
      `${process.env.LOCATIONS_SERVICE_URL}/locations/${id}`,
    );
  }
}
