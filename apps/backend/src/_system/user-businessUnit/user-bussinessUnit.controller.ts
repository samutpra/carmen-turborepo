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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserBusinessUnitService } from './user-bussinessUnit.service';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/system';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitUpdateDto,
} from './dto/user-businessUnit.dto';

@Controller('api/v1/user-businessUnit')
@ApiTags('user businessUnit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserBusinessUnitController {
  constructor(private readonly userTenantService: UserBusinessUnitService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    return this.userTenantService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.userTenantService.findAll(req);
  }

  @Post()
  async create(
    @Body() createDto: UserBusinessUnitCreateDto,
    @Req() req: Request,
  ) {
    return this.userTenantService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserBusinessUnitUpdateDto,
    @Req() req: Request,
  ) {
    return this.userTenantService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.userTenantService.delete(req, id);
  }
}
