import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DepartmentUserService } from './department-user.service';

@Controller('department-user')
export class DepartmentUserController {
  constructor(private readonly departmentUserService: DepartmentUserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departmentUserService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.departmentUserService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.departmentUserService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.departmentUserService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentUserService.delete(id);
  }
}
