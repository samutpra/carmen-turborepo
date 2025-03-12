import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/config/units')
@ApiTags('Config - Units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  private logger = new Logger(UnitsController.name);

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.debug({
      file: UnitsController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
    // return this.unitsService.findOne(id);
  }

  @Get()
  async findAll() {
    this.logger.debug({
      file: UnitsController.name,
      function: this.findAll.name,
    });
    // return this.unitsService.findAll();
  }

  @Post()
  async create(@Body() createDto: any) {
    this.logger.debug({
      file: UnitsController.name,
      function: this.create.name,
    });
    // return this.unitsService.create(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    this.logger.debug({
      file: UnitsController.name,
      function: this.update.name,
    });
    // return this.unitsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.debug({
      file: UnitsController.name,
      function: this.remove.name,
    });
    // return this.unitsService.remove(id);
  }
}
