export interface QueryAdvance {
  where: Record<string, string>;
}
export class KeyValueString {
  public Key: string;
  public Value: string;

  constructor(key: string, value: string) {
    this.Key = key;
    this.Value = value;
  }
}

// export enum enumSearchStrType {
//   Number,
//   String,
//   Date,
//   Boolean,
// }

export default class QueryParams {
  public readonly page: number;
  public readonly perpage: number;
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
    searchFields: string = null,
    defaultSearchFields: string[] = [],
    filter: Record<string, string> = {},
    sort: string = '',
    advance: QueryAdvance = null,
  ) {
    if (typeof page !== 'number') {
      page = parseInt(page);
    }

    if (typeof perpage !== 'number') {
      perpage = parseInt(perpage);
    }

    this.page = page;
    this.perpage = perpage;
    this.search = search;
    this.searchFields = searchFields ? searchFields.split(',') : [];

    this.defaultSearchFields = defaultSearchFields;

    if (this.searchFields.length <= 0) {
      this.searchFields = this.defaultSearchFields;
    }
    this.filter = filter;
    this.sort = sort.split(',');
    this.advance = advance;
  }

  public where(): any {
    const _where: any = {
      AND: {},
    };

    if (this.advance != null && this.advance.where != null) {
      _where.AND = this.advance?.where;
    } else {
      if (this.filter && Object.keys(this.filter).length > 0) {
        _where.AND = Object.entries(this.filter).map(([key, value]) => {
          const [k, f] = key.split(':');

          switch (f) {
            case 'number':
            case 'num':
              return {
                [k]: value,
              };

            case 'bool':
            case 'boolean':
              return {
                [k]:
                  value.toLowerCase() == 'true' || value.toLowerCase() == '1',
              };

            case 'date':
            case 'datetime':
              return {
                [k]: new Date(value),
              };

            default:
              return {
                [k]: { contains: value, mode: 'insensitive' },
              };
          }
        });
      }

      if (this.searchFields.length <= 0) {
        this.searchFields = this.defaultSearchFields;
      }

      let searchCol: KeyValueString[] = [];

      if (this.search != '') {
        searchCol = this.searchFields.map((f) => {
          const [k, t] = f.split(':');
          return new KeyValueString(k.trim(), t ?? 'string');
        });

        _where.OR = searchCol.map((o) => {
          const k = o.Key;
          const f = o.Value;

          switch (f) {
            case 'number':
            case 'num':
              return {
                [k]: this.search,
              };
            case 'bool':
            case 'boolean':
              return {
                [k]:
                  this.search.toLowerCase() == 'true' ||
                  this.search.toLowerCase() == '1',
              };
            case 'date':
            case 'datetime':
              return {
                [k]: new Date(this.search),
              };
            default:
              return {
                [k]: { contains: this.search, mode: 'insensitive' },
              };
          }
        });
      }
    }

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

    return result;
  }

  public findMany(): any {
    const _where: any = this.where();
    const _order: any = this.orderBy();
    const _skip: number = (this.page - 1) * this.perpage;
    const _take: number = this.perpage;

    return {
      where: _where,
      orderBy: _order,
      skip: _skip,
      take: _take,
    };
  }
}
