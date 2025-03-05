import { BadRequestException, Body, Controller, 
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SystemUsersService } from './system_users.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SupabaseAuthGuard } from 'nest-supabase-guard/dist/supabase-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiUserFilterQueries } from 'lib/decorator/userfilter.decorator';
import { UserCreateSchema, UserUpdateDto, UserUpdateSchema } from 'shared-dtos';
import QueryParams, { QueryAdvance, } from 'lib/types';
import { UserCreateDto } from 'shared-dtos';
import { ZodValidationPipe } from 'lib/types/ZodValidationPipe';
@Controller('system-api/v1/users')
@ApiTags('system/users')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
export class SystemUsersController {
  constructor(private readonly systemUsersService: SystemUsersService) {}

  private readonly logger = new Logger(SystemUsersController.name);

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    this.logger.log({ id });
    return this.systemUsersService.findOne(req, id);
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
    const defaultSearchFields: string[] = [
      'name',
      'code',
      'symbol',
      'description',
    ];

    this.logger.log({
      page,
      perpage,
      search,
      searchfields,
      filter,
      sort,
      advance,
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

    this.logger.log({ q });
    return this.systemUsersService.findAll(req, q);
  }

  @Post()
  @ApiBody({
    type: UserCreateDto,
    description: 'UserCreateDto',
  })
  @UsePipes(new ZodValidationPipe(UserCreateSchema))
  async create(@Body() createDto: UserCreateDto, @Req() req: Request) {
    this.logger.log({ createDto });
    const parseObj = UserCreateSchema.safeParse(createDto);
    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }

    this.logger.log({ createDto });
    return this.systemUsersService.create(req, createDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  @ApiBody({
    type: UserUpdateDto,
    description: 'UserUpdateDto',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserUpdateDto,
    @Req() req: Request,
  ) {
    this.logger.log({ id, updateDto });
    const parseObj = UserUpdateSchema.safeParse(updateDto);

    if (!parseObj.success) {
      throw new BadRequestException(parseObj.error.format());
    }

    const updatedto = updateDto;
    updatedto.id = id;
    this.logger.log({ updatedto });
    return this.systemUsersService.update(req, id, updatedto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id',
    required: true,
    type: 'uuid',
  })
  async delete(@Param('id') id: string, @Req() req: Request) {
    this.logger.log({ id });
    return this.systemUsersService.delete(req, id);
  }
}
