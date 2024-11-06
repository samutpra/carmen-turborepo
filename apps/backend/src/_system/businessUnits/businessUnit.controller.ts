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
import { BusinessUnitsService } from './businessUnit.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ResponseList, ResponseSingle } from 'lib/helper/iResponse';
import { BusinessUnit } from '@prisma-carmen-client-system';
import { BusinessUnitCreateDto, BusinessUnitUpdateDto } from 'shared-dtos';

@Controller('api/v1/businessUnits')
@ApiTags('businessUnit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BusinessUnitsController {
  constructor(private readonly tenantsService: BusinessUnitsService) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<BusinessUnit>> {
    return this.tenantsService.findOne(req, id);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<ResponseList<BusinessUnit>> {
    return this.tenantsService.findAll(req);
  }

  @Post()
  async create(@Body() createDto: BusinessUnitCreateDto, @Req() req: Request) {
    return this.tenantsService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: BusinessUnitUpdateDto,
    @Req() req: Request,
  ) {
    return this.tenantsService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.tenantsService.delete(req, id);
  }
}
