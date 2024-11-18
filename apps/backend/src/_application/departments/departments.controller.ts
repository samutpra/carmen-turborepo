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
  Logger,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  DepartmentCreateDto,
  DepartmentUpdateDto,
} from '@carmensoftware/shared-dtos';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';

@Controller('api/v1/departments')
@ApiTags('department')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  private readonly logger = new Logger(DepartmentsController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async fineOne(@Param('id') id: string, @Req() req: Request) {
    return this.departmentsService.findOne(req, id);
  }

  @Get()
  @ApiUserFilterQueries()
  async findAll(
    @Req() req: Request,
    @Query('page') page?: number,
    @Query('perpage') perpage?: number,
    @Query('search') search?: string,
    @Query('searchfields') searchfields?: string,
    @Query('filter') filter?: Record<string, string>,
    @Query('sort') sort?: string,
    @Query('advance') advance?: QueryAdvance,
  ) {
    const defaultSearchFields: string[] = ['name', 'description'];

    const q = new QueryParams(
      page,
      perpage,
      search,
      searchfields,
      defaultSearchFields,
      filter,
      sort,
      advance,
    );
    return this.departmentsService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: DepartmentCreateDto,
    description: 'DepartmentCreateDto',
  })
  async create(@Body() createDto: any, @Req() req: Request) {
    return this.departmentsService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: DepartmentUpdateDto,
    description: 'DepartmentUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: any,
    @Req() req: Request,
  ) {
    const { ...updatedto } = updateDto;
    updatedto.id = id;
    return this.departmentsService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.departmentsService.delete(req, id);
  }
}
