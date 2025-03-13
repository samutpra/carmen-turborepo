import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { GoodReceiveNoteService } from './good-receive-note.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/good-receive-note')
@ApiTags('Config - Good Receive Note')
export class GoodReceiveNoteController {
  constructor(
    private readonly goodReceiveNoteService: GoodReceiveNoteService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.goodReceiveNoteService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.goodReceiveNoteService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.goodReceiveNoteService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.goodReceiveNoteService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.goodReceiveNoteService.delete(id);
  }
}
