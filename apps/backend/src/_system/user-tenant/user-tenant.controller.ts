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
import { UserTenantService } from './user-tenant.service';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { Prisma } from '@prisma-carmen-client/system';
import {
  UserTenantCreateDto,
  UserTenantUpdateDto,
} from './dto/user-tenant.dto';

@Controller('api/v1/user-tenant')
@ApiTags('user tenant')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserTenantController {
  constructor(private readonly userTenantService: UserTenantService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    return this.userTenantService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.userTenantService.findAll(req);
  }

  @Post()
  async create(@Body() createDto: UserTenantCreateDto, @Req() req: Request) {
    return this.userTenantService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserTenantUpdateDto,
    @Req() req: Request,
  ) {
    return this.userTenantService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.userTenantService.delete(req, id);
  }
}
