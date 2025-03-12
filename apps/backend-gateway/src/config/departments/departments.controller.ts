import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/departments')
@ApiTags('Config - Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  private readonly logger = new Logger(DepartmentsController.name);

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.debug({ id: id });
    // return this.departmentsService.findOne(id);
  }

  @Get()
  async findAll() {
    this.logger.debug({});
    // return this.departmentsService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    this.logger.debug({ createDto: createDto });
    // return this.departmentsService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    this.logger.debug({ id: id, updateDto: updateDto });
    // return this.departmentsService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.debug({ id: id });
    // return this.departmentsService.delete(id);
  }
}
