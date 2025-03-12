import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { CreditNoteService } from './credit-note.service';
import { CreditNoteCreateDto } from './dto/credit-note.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('api/credit-note')
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

  @UsePipes(ZodValidationPipe)
  @Post()
  async create(@Body() createDto: CreditNoteCreateDto) {
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
