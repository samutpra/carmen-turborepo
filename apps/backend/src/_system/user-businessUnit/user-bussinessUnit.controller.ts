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
  Logger,
  Query,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserBusinessUnitService } from './user-bussinessUnit.service';
import { JwtAuthGuard } from 'src/_lib/auth/guards/jwt.guard';
import {
  UserBusinessUnitCreateDto,
  UserBusinessUnitCreateSchema,
  UserBusinessUnitUpdateDto,
  UserBusinessUnitUpdateSchema,
} from '@carmensoftware/shared-dtos';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import QueryParams, { QueryAdvance } from 'lib/types';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';

@Controller('system-api/v1/user-businessUnit')
@ApiTags('system/user businessUnit')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-tenant-id',
  description: 'tenant id',
})
@UseGuards(JwtAuthGuard)
export class UserBusinessUnitController {
  constructor(
    private readonly userBusinessUnitService: UserBusinessUnitService,
  ) {}

  private readonly logger = new Logger(UserBusinessUnitController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.userBusinessUnitService.findOne(req, id);
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
    const defaultSearchFields: string[] = [];

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
    return this.userBusinessUnitService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UserBusinessUnitCreateDto,
    description: 'UserBusinessUnitCreateDto',
  })
  @UsePipes(new ZodValidationPipe(UserBusinessUnitCreateSchema))
  async create(
    @Body() createDto: UserBusinessUnitCreateDto,
    @Req() req: Request,
  ) {
    return this.userBusinessUnitService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: UserBusinessUnitUpdateDto,
    description: 'UserBusinessUnitUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserBusinessUnitUpdateDto,
    @Req() req: Request,
  ) {
    const parseObj = UserBusinessUnitUpdateSchema.safeParse(updateDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }
    const updatedto = parseObj.data;
    updatedto.id = id;
    return this.userBusinessUnitService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.userBusinessUnitService.delete(req, id);
  }
}
