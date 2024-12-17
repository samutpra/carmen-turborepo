import { log } from 'console';
import { ZodSchema } from 'zod';

import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

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
