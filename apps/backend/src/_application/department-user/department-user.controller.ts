import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DepartmentUserService } from './department-user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import {
  DepartmentUserCreateDto,
  DepartmentUserUpdateDto,
} from 'shared-dtos/department-user/department-user.dto';
@Controller('api/v1/department-user')
@ApiTags('department-user')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class DepartmentUserController {
  constructor(private readonly departmentUserService: DepartmentUserService) {}

  private readonly logger = new Logger(DepartmentUserController.name);

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({
      file: DepartmentUserController.name,
      function: this.findOne.name,
    });
    this.logger.debug({ id: id });
    return this.departmentUserService.findOne(req, id);
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
    this.logger.debug({
      file: DepartmentUserController.name,
      function: this.findAll.name,
    });
    const defaultSearchFields: string[] = ['name', 'description'];

    this.logger.debug({
      page: page,
      perpage: perpage,
      search: search,
      searchfields: searchfields,
      filter: filter,
      sort: sort,
      advance: advance,
    });

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
    this.logger.debug({ q: q });
    return this.departmentUserService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: DepartmentUserCreateDto,
    description: 'DepartmentUserCreateDto',
  })
  async create(@Req() req: Request, @Body() body: DepartmentUserCreateDto) {
    this.logger.debug({
      file: DepartmentUserController.name,
      function: this.create.name,
    });
    this.logger.debug({ body: body });
    return this.departmentUserService.create(req, body);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: DepartmentUserUpdateDto,
    description: 'DepartmentUserUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: DepartmentUserUpdateDto,
  ) {
    this.logger.debug({
      file: DepartmentUserController.name,
      function: this.update.name,
    });
    this.logger.debug({ id: id, body: body });
    return this.departmentUserService.update(req, id, body);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    this.logger.debug({
      file: DepartmentUserController.name,
      function: this.delete.name,
    });
    this.logger.debug({ id: id });
    return this.departmentUserService.delete(req, id);
  }
}
