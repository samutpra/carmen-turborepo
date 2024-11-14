import { ApiQuery } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiUserFilterQueries() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      description: 'Page',
      required: false,
      type: 'number',
    }),
    ApiQuery({
      name: 'perpage',
      description: 'Perpage',
      required: false,
      type: 'number',
    }),
    ApiQuery({
      name: 'search',
      description: 'Search',
      required: false,
      type: 'string',
    }),
    ApiQuery({
      name: 'filter',
      description: 'Filter',
      required: false,
      type: 'Record<string, string>',
    }),
    ApiQuery({
      name: 'searchfields',
      description: 'searchfields',
      required: false,
      type: 'string',
    }),
    ApiQuery({
      name: 'sort',
      description: 'sort',
      required: false,
      type: 'string',
    }),
  );
}
