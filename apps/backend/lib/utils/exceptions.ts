import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class DuplicateException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(objectOrError, HttpStatus.CONFLICT, {
      cause: descriptionOrOptions,
    });
  }
}

export class NotImplementYet extends HttpException {
  constructor() {
    super('Not Implement Yet', HttpStatus.NOT_IMPLEMENTED);
  }
}
