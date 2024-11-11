export default class QueryParams {
  public readonly page: number;
  public readonly perPage: number;
  public readonly searchStr: string;
  public searchFields: string[];
  public readonly defaultSearchFields: string[];
  public readonly filter: Record<string, string>;
  public readonly sort: string[];

  constructor(
    page: number = 1,
    perpage: number = 10,
    search: string = '',
    searchFields: string,
    defaultSearchFields: string[] = [],
    filter: Record<string, string> = {},
    sort: string = '',
  ) {
    this.page = page;
    this.perPage = perpage;
    this.searchStr = search;
    this.searchFields = searchFields.split(',') || [];
    this.defaultSearchFields = defaultSearchFields;
    this.filter = filter;
    this.sort = sort.split(',');
  }

  public where(): any {
    const _where: any = {};

    if (this.filter && Object.keys(this.filter).length > 0) {
      _where.AND = Object.entries(this.filter).map(([key, value]) => ({
        [key]: { contains: value, mode: 'insensitive' },
      }));
    }

    if (this.searchFields.length <= 0) {
      this.searchFields = this.defaultSearchFields;
    }

    let searchCol: any = [];

    if (this.searchStr !== '') {
      searchCol = this.searchFields.map((field) => ({
        [field.trim()]: { contains: this.searchStr, mode: 'insensitive' },
      }));

      _where.AND = {
        ..._where,
        OR: searchCol,
      };
    }
    console.log(_where);
    return _where;
  }

  public orderBy(): any {
    let result = [];

    if (this.sort.length > 0) {
      const list = this.sort.map((s) => {
        const [field, order] = s.split(':');

        if (order === 'desc') {
          return { [field.trim()]: 'desc' };
        } else {
          return { [field.trim()]: 'asc' };
        }
      });

      result = list;
    } else {
      result = [];
    }

    console.log(result);
    return result;
  }

  public findMany(): any {
    const w = this.where();
    const o = this.orderBy();
    const s = (this.page - 1) * this.perPage;
    const t = this.perPage;

    console.log({ where: w, orderBy: o, skip: s, take: t });

    return {
      where: w,
      orderBy: o,
      skip: s,
      take: t,
    };
  }
}
