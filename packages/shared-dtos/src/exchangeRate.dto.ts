export class ExchangeRateCreateDto {
	id?: string;
	dateAt?: Date | string | null;
	rate?: number | null;
}

export class ExchangeRateUpdateDto extends ExchangeRateCreateDto {
	override id!: string;
}
