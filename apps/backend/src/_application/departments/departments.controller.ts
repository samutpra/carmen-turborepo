import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from '@prisma-carmen-client-tenant';
import { ResponseId, ResponseSingle } from 'lib/helper/iResponse';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import {
  DepartmentCreateDto,
  DepartmentUpdateDto,
} from '@carmensoftware/shared-dtos';

@Controller('api/v1/departments')
@ApiTags('department')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get(':id')
  async fineOne(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<ResponseSingle<Department>> {
    return this.departmentsService.findOne(req, id);
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('perpage') perpage: number,
    @Query('search') search: string = '',
    @Query('filter') filter: Record<string, string> = {},
  ) {
    return this.departmentsService.findAll(req, page, perpage, search, filter);
  }

  @Post()
  async create(
    @Body() createDto: DepartmentCreateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.departmentsService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: DepartmentUpdateDto,
    @Req() req: Request,
  ): Promise<ResponseId<string>> {
    return this.departmentsService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.departmentsService.delete(req, id);
  }
}
