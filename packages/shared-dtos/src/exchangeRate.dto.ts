export class ExchangeRateCreateDto {
	id?: string;
	at_date?: Date | string | null;
	rate?: number | null;
	currency_id!: string;
}

export class ExchangeRateUpdateDto extends ExchangeRateCreateDto {
	override id!: string;
}
