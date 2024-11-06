import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { UnitCreateDto, UnitUpdateDto } from 'shared-dtos';

@Controller('api/v1/units')
@ApiTags('units')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.unitsService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.unitsService.findAll(req);
  }

  @Post()
  async create(@Body() createDto: UnitCreateDto, @Req() req: Request) {
    return this.unitsService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UnitUpdateDto,
    @Req() req: Request,
  ) {
    return this.unitsService.update(req, id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return this.unitsService.delete(req, id);
  }
}
