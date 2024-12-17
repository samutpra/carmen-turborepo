import { IResponseId, IResponseList, IResponseSingle } from './iResponse';

export interface IAsyncService<T, C, U> {
  get: (
    id: string,
    tenantId?: string,
  ) => Promise<IResponseSingle<T>> | Promise<T> | Promise<string>;

  create: (
    data: C,
    tenantId?: string,
  ) =>
    | Promise<IResponseId<T>>
    | Promise<IResponseSingle<T>>
    | Promise<T>
    | Promise<string>;

  update: (
    id: string,
    data: U,
    tenantId?: string,
  ) =>
    | Promise<IResponseId<T>>
    | Promise<IResponseSingle<T>>
    | Promise<T>
    | Promise<string>;

  delete: (
    id: string,
    tenantId?: string,
  ) =>
    | Promise<IResponseId<T>>
    | Promise<IResponseSingle<T>>
    | Promise<T>
    | Promise<string>;

  getAll: (
    tenantId?: string,
  ) => Promise<IResponseList<T>> | Promise<T[]> | Promise<string>;
}
