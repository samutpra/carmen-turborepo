import { contains } from 'class-validator';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';

export interface QueryAdvance {
  where: Record<string, string>;
}
export default class QueryParams {
  public readonly page: number;
  public readonly perPage: number;
  public readonly search: string;
  public searchFields: string[];
  public readonly defaultSearchFields: string[];
  public readonly filter: Record<string, string>;
  public readonly sort: string[];
  public readonly advance: QueryAdvance;

  constructor(
    page: number = 1,
    perpage: number = 10,
    search: string = '',
    searchFields: string,
    defaultSearchFields: string[] = [],
    filter: Record<string, string> = {},
    sort: string = '',
    advance: QueryAdvance = null,
  ) {
    this.page = page;
    this.perPage = perpage;
    this.search = search;
    this.searchFields = searchFields.split(',') || [];
    this.defaultSearchFields = defaultSearchFields;
    this.filter = filter;
    this.sort = sort.split(',');
    this.advance = advance;

    console.log({
      title: 'constructor',
      page: this.page,
      perPage: this.perPage,
      search: this.search,
      searchFields: this.searchFields,
      filter: this.filter,
      sort: this.sort,
      advance: this.advance,
    });
  }

  public where(): any {
    const _where: any = {};

    if (this.advance != null && this.advance.where != null) {
      _where.AND = this.advance?.where;
    } else {
      if (this.filter && Object.keys(this.filter).length > 0) {
        _where.AND = Object.entries(this.filter).map(([key, value]) => ({
          [key]: { contains: value, mode: 'insensitive' },
        }));
      }

      if (this.searchFields.length <= 0) {
        this.searchFields = this.defaultSearchFields;
      }

      let searchCol: any = {};

      if (this.search != '') {
        searchCol = this.searchFields.map((field) => {
          const k = field.trim();
          const v = {
            contains: this.search,
            mode: 'insensitive',
          };

          return {
            [k]: v,
          };
        });
      }

      // if (this.search != '') {
      //   _where.OR = { ...searchCol };
      // }
    }

    console.log({ title: 'where', where: _where });
    return _where;
  }

  public orderBy(): any {
    let result = {};

    if (this.sort.length > 0) {
      const list = this.sort
        .map((s) => {
          const [field, order] = s.split(':');

          if (order === 'desc') {
            return { [field.trim()]: 'desc' };
          } else {
            return { [field.trim()]: 'asc' };
          }
        })
        .filter((o) => Object.keys(o).toString() != '');

      result = list;
    } else {
      result = {};
    }

    console.log({ title: 'orderBy', orderBy: this.orderBy });
    return result;
  }

  public findMany(): any {
    const w: any = this.where();
    const order: any = this.orderBy();
    const o: any = order;
    const s: any = (this.page - 1) * this.perPage;
    const t: any = this.perPage;

    console.log({ title: 'findMany', where: w, orderBy: o, skip: s, take: t });

    return {
      where: w,
      orderBy: o,
      skip: s,
      take: t,
    };
  }
}
