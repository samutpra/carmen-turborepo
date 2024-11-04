import { IPagination } from './iPagination';

export interface IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export class ResponseList<T> implements IResponseList<T> {
  data: T[];
  pagination: IPagination;
}

export interface IResponseSingle<T> {
  data: T;
}

export class ResponseSingle<T> implements IResponseSingle<T> {
  data: T;
}

export interface IResponseId<T> {
  id: T;
}

export class ResponseId<T> implements IResponseId<T> {
  id: T;
}
