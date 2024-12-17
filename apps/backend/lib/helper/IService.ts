import { IResponseId, IResponseList, IResponseSingle } from './iResponse';

export interface IService<T, C, U> {
  get: (id: string, tenantId?: string) => IResponseSingle<T> | T | string;

  create: (
    data: C,
    tenantId?: string,
  ) => IResponseId<T> | IResponseSingle<T> | T | string;

  update: (
    id: string,
    data: U,
    tenantId?: string,
  ) => IResponseId<T> | IResponseSingle<T> | T | string;

  delete: (
    id: string,
    tenantId?: string,
  ) => IResponseId<T> | IResponseSingle<T> | T | string;

  getAll: (tenantId?: string) => IResponseList<T> | T[] | string;
}
