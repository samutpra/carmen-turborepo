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
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { UserCreateDto, UserUpdateDto } from 'shared-dtos';

@Controller('api/v1/users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.findOne(req, id);
  }

  @Get()
  async getAll(@Req() req: Request) {
    return this.usersService.findAll(req);
  }

  @Post()
  @ApiBody({
    type: UserCreateDto,
  })
  async create(@Body() createDto: UserCreateDto, @Req() req: Request) {
    return this.usersService.create(req, createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserUpdateDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(req, id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.delete(req, id);
  }
}
