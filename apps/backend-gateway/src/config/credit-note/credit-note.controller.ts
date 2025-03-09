import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreditNoteService } from './credit-note.service';

@Controller('credit-note')
export class CreditNoteController {
  constructor(private readonly creditNoteService: CreditNoteService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.creditNoteService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.creditNoteService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.creditNoteService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.creditNoteService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.creditNoteService.delete(id);
  }
}
