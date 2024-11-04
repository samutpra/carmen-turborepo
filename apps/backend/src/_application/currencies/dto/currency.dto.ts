export class CurrencyCreateDto {
  id?: string;
  code: string;
  name: string;
  symbol?: string | null;
  description?: string | null;
  isActive?: boolean | null;
  rate?: number | null;
}

export class CurrencyUpdateDto extends CurrencyCreateDto {
  id: string;
}

// export class CurrencyDto {
//   id?: string;
//   code: string;
//   name: string;
//   symbol?: string | null;
//   description?: string | null;
//   isActive?: boolean | null;
//   rate?: number | null;
// }
