import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/workflows')
@ApiTags('Config - Workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.workflowsService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.workflowsService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.workflowsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.workflowsService.delete(id);
  }
}
