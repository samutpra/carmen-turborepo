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
import { ExchangeRateService } from './exchange-rate.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/exchange-rate')
@ApiTags('Config - Exchange Rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  private readonly logger = new Logger(ExchangeRateController.name);

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.debug({ id: id });
    // return this.exchangeRateService.findOne(id);
  }

  @Get()
  async findAll() {
    this.logger.debug({});
    // return this.exchangeRateService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    this.logger.debug({ createDto: createDto });
    // return this.exchangeRateService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    this.logger.debug({ id: id, updateDto: updateDto });
    // return this.exchangeRateService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.debug({ id: id });
    // return this.exchangeRateService.delete(id);
  }
}
