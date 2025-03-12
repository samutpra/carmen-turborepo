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
import { CurrenciesService } from './currencies.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/currencies')
@ApiTags('Config - Currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  private readonly logger = new Logger(CurrenciesController.name);

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
    // return this.currenciesService.findOne(id);
  }

  @Get()
  async findAll() {
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.findAll.name,
    });
    // return this.currenciesService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.create.name,
    });
    this.logger.debug({ createDto: createDto });
    // return this.currenciesService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.update.name,
    });
    this.logger.debug({ id: id, updateDto: updateDto });
    // return this.currenciesService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.debug({
      file: CurrenciesController.name,
      function: this.delete.name,
    });
    this.logger.debug({ id: id });
    // return this.currenciesService.delete(id);
  }
}
