import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import { ZodSchema } from 'zod';
import { log } from 'console';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    log('value', value);
    log('metadata', metadata);
    const parseObj = this.schema.safeParse(value);

    if (parseObj.success) {
      return parseObj.data;
    }

    throw new BadRequestException(parseObj.error.format());
  }
}
