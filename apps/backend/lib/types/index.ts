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
    searchFields: string = null,
    defaultSearchFields: string[] = [],
    filter: Record<string, string> = {},
    sort: string = '',
    advance: QueryAdvance = null,
  ) {
    this.page = page;
    this.perPage = perpage;
    this.search = search;
    this.searchFields = searchFields ? searchFields.split(',') : [];

    this.defaultSearchFields = defaultSearchFields;

    // console.log({ searchFields: this.searchFields });
    // console.log({ searchFields_length: this.searchFields.length });

    if (this.searchFields.length <= 0) {
      this.searchFields = this.defaultSearchFields;
    }
    this.filter = filter;
    this.sort = sort.split(',');
    this.advance = advance;

    // console.log({
    //   title: 'constructor',
    //   page: this.page,
    //   perPage: this.perPage,
    //   search: this.search,
    //   searchFields: this.searchFields,
    //   filter: this.filter,
    //   sort: this.sort,
    //   advance: this.advance,
    // });
  }

  // public searchTypeIs(): enumSearchStrType {
  //   if (this.searchFields.length <= 0) {
  //     this.searchFields = this.defaultSearchFields;
  //   }

  //   if (this.searchFields.length <= 0) {
  //     return enumSearchStrType.String;
  //   }

  //   const searchType = this.searchFields[0].split(':')[1];

  //   if (searchType == 'number') {
  //     return enumSearchStrType.Number;
  //   } else if (searchType == 'string') {
  //     return enumSearchStrType.String;
  //   } else if (searchType == 'date') {
  //     return enumSearchStrType.Date;
  //   } else if (searchType == 'boolean') {
  //     return enumSearchStrType.Boolean;
  //   } else {
  //     return enumSearchStrType.String;
  //   }
  // }

  public where(): any {
    const _where: any = {};

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

          // return {
          //   [k.trim()]: { contains: value, mode: 'insensitive' },
          // };
        });
      }

      if (this.searchFields.length <= 0) {
        this.searchFields = this.defaultSearchFields;
      }

      // console.log({ defaultSearchFields: this.defaultSearchFields });
      // console.log({ searchfield: this.searchFields });

      // if (this.search != ''
      let searchCol: KeyValueString[] = [];

      if (this.search != '') {
        searchCol = this.searchFields.map((f) => {
          const [k, t] = f.split(':');
          return new KeyValueString(k.trim(), t ?? 'string');
        });

        // console.log({ searchCol: searchCol });

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

        // console.log({
        //   title: 'searchCol',
        //   searchCol: searchCol,
        //   where_or: _where.OR,
        // });
      }
    }

    // console.log({ title: 'where', where: _where });
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

    // console.log({ title: 'orderBy', orderBy: this.orderBy });
    return result;
  }

  public findMany(): any {
    const w: any = this.where();
    const order: any = this.orderBy();
    const o: any = order;
    const s: any = (this.page - 1) * this.perPage;
    const t: any = this.perPage;

    // console.log({ title: 'findMany', where: w, orderBy: o, skip: s, take: t });

    return {
      where: w,
      orderBy: o,
      skip: s,
      take: t,
    };
  }
}
