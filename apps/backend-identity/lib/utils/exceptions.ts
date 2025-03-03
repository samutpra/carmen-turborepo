import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from "@nestjs/common";

export class NotFoundException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(objectOrError, HttpStatus.NOT_FOUND, {
      cause: descriptionOrOptions,
    });
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
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
export class InvalidTokenException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(objectOrError, HttpStatus.CONFLICT, {
      cause: descriptionOrOptions,
    });
  }
}

export class NotImplementException extends HttpException {
  constructor() {
    super("Not Implement Yet", HttpStatus.NOT_IMPLEMENTED);
  }
}

export class NullException extends HttpException {
  constructor() {
    super("Null data", HttpStatus.BAD_REQUEST);
  }
}

export class ToomanyException extends HttpException {
  constructor() {
    super("Too many request", HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class RateLimitException extends HttpException {
  constructor() {
    super("Rate limit exceeded", HttpStatus.TOO_MANY_REQUESTS);
  }
}
