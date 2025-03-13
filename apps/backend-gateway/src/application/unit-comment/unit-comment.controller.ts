import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UnitCommentService } from './unit-comment.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/application/unit-comment')
@ApiTags('Application - Unit Comment')
export class UnitCommentController {
  constructor(private readonly unitCommentService: UnitCommentService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.unitCommentService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.unitCommentService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.unitCommentService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.unitCommentService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unitCommentService.delete(id);
  }
}
