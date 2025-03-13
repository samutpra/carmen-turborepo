import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { RunningCodeService } from './running-code.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/running-code')
@ApiTags('Running Code')
export class RunningCodeController {
  constructor(private readonly runningCodeService: RunningCodeService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.runningCodeService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.runningCodeService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.runningCodeService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.runningCodeService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.runningCodeService.delete(id);
  }
}
