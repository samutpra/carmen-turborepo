import { IPagination } from './iPagination';

export class Pagination implements IPagination {
  page?: number | 0;
  pages?: number | 0;
  perpage?: number | 10;
  total?: number | 0;
}
